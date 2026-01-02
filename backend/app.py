# app.py
import os
import re
import uuid
from typing import List, Optional, Dict, Any, Set

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load .env strictly from current working directory
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
print(f"[ENV] GEMINI_API_KEY found? {'yes' if api_key else 'no'}")

# -------------------------------
# Optional Gemini (google-generativeai)
# -------------------------------
GEMINI_AVAILABLE = True
try:
    import google.generativeai as genai
except Exception:
    GEMINI_AVAILABLE = False

# -------------------------------
# Optional ChromaDB + file parsers
# -------------------------------
CHROMA_AVAILABLE = True
try:
    import chromadb
    from chromadb.api.types import Documents, Embeddings, IDs, Metadatas
except Exception:
    CHROMA_AVAILABLE = False

PDF_AVAILABLE = True
try:
    from pypdf import PdfReader
except Exception:
    PDF_AVAILABLE = False

DOCX_AVAILABLE = True
try:
    import docx  # python-docx
except Exception:
    DOCX_AVAILABLE = False


# -------------------------------
# Minimal LLM wrapper (hardened + one retry w/ shorter tokens)
# -------------------------------
class LLMUnavailableError(Exception):
    pass


class GeminiLLM:
    def __init__(self, api_key: Optional[str], model_name: str = "gemini-2.5-flash"):
        if not GEMINI_AVAILABLE:
            raise LLMUnavailableError("google-generativeai package not installed.")
        if not api_key:
            raise LLMUnavailableError("GEMINI_API_KEY not set.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    @staticmethod
    def _extract_text(resp) -> str:
        # 1) Try quick accessor, but NEVER let it raise
        try:
            if getattr(resp, "text", None):
                t = resp.text
                if t:
                    return t.strip()
        except Exception:
            pass
        # 2) Fallback: assemble from candidates/parts
        try:
            cands = getattr(resp, "candidates", None) or []
            for cand in cands:
                content = getattr(cand, "content", None)
                parts = getattr(content, "parts", None) if content else None
                if parts:
                    chunks = []
                    for p in parts:
                        t = getattr(p, "text", None)
                        if t:
                            chunks.append(t)
                    if chunks:
                        return "\n".join(chunks).strip()
        except Exception:
            pass
        return ""

    def _call(self, prompt: str, temperature: float, max_output_tokens: int):
        return self.model.generate_content(
            prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_output_tokens
            }
        )

    def generate_text(self, prompt: str, temperature: float = 0.6, max_output_tokens: int = 2048) -> str:
        # First attempt
        try:
            resp = self._call(prompt, temperature, max_output_tokens)
        except Exception as e:
            raise RuntimeError(f"Gemini generate_content error: {e}")

        text = self._extract_text(resp)
        if text:
            return text

        # Retry once with fewer tokens + brevity hint
        try:
            shorter_cap = max(512, max_output_tokens // 2)
            brief_prompt = f"{prompt}\n\nReturn under ~600 words."
            resp2 = self._call(brief_prompt, temperature, shorter_cap)
            text2 = self._extract_text(resp2)
            if text2:
                return text2
        except Exception as e2:
            raise RuntimeError(f"Gemini retry error: {e2}")

        feedback = getattr(resp, "prompt_feedback", None)
        raise RuntimeError(f"Gemini returned empty text after retry. Feedback: {feedback}")


# -------------------------------
# Embedding helper (Gemini text-embedding-004)
# -------------------------------
class EmbeddingUnavailableError(Exception):
    pass


def embed_texts_with_gemini(texts: List[str]) -> List[List[float]]:
    if not GEMINI_AVAILABLE or not api_key:
        raise EmbeddingUnavailableError("Gemini embeddings not available.")
    # google.generativeai embed_content (single) or batch via loop
    vectors: List[List[float]] = []
    for t in texts:
        try:
            resp = genai.embed_content(model="text-embedding-004", content=t or "")
            vec = resp["embedding"] if isinstance(resp, dict) else getattr(resp, "embedding", None)
            if not vec:
                raise RuntimeError("Empty embedding from Gemini.")
            vectors.append(vec)
        except Exception as e:
            raise RuntimeError(f"Embedding error: {e}")
    return vectors


# -------------------------------
# Matching utilities (simple + fast)
# -------------------------------
_WORD = re.compile(r"[a-z0-9+#\.\-]+")

DEFAULT_HINTS = {
    "python","java","javascript","typescript","go","c++","c#","rust","sql",
    "html","css","react","nextjs","vue","node","express","fastapi","django","flask",
    "keras","pytorch","tensorflow","sklearn","machine","learning","ml","nlp",
    "pandas","numpy","matplotlib","seaborn","airflow","dbt","spark","hadoop",
    "kafka","docker","kubernetes","linux","aws","gcp","azure","sagemaker",
    "vertex","bigquery","redshift","snowflake","postgres","mysql","mongo",
    "graphql","rest","api","ci","cd","git","testing","pytest","jest","cicd",
    "microservices","llm","rag","prompt","engineering","vector","embeddings",
    "security","devops","mle","data","scientist","engineer","analysis","etl",
    "powerbi","tableau","superset","dashboards","metrics","backend","frontend",
    "fullstack","system","design","architecture","orchestration","terraform",
    "product","manager","pm","analytics","timeseries","oop","dsa","leetcode"
}

# Expanded STOP (filters fillers like "looking", "skills", plus course fillers)
STOP = {
    "and","or","for","the","a","an","to","in","of","on","with","by","at","from","as","is","are","be",
    "looking","experienced","bonus","senior","junior","mid","years","experience","requirements",
    "responsibilities","skills","skill","role","position","seeking","strong",
    "intro","introduction","basics","fundamentals","beginner","beginners","for"
}


def normalize_text(s: str) -> str:
    s = s.lower().replace("\n", " ")
    return " ".join(s.split())


def tokenize(s: str) -> Set[str]:
    raw = [m.group(0) for m in _WORD.finditer(s)]
    return {t.strip(".,!?:;()[]{}\"'") for t in raw if t.strip(".,!?:;()[]{}\"'")}


def simple_skill_set_from_text(s: str) -> Set[str]:
    tokens = tokenize(s)
    skills = {t for t in tokens if (t in DEFAULT_HINTS or (t not in STOP and len(t) > 2))}
    return skills


def extract_keywords_from_job_text(s: str) -> Set[str]:
    s = normalize_text(s)
    tokens = tokenize(s)
    keywords = {t for t in tokens if (t in DEFAULT_HINTS or (len(t) > 3 and any(c.isalpha() for c in t)))}
    return keywords


def compute_overlap_score(a: Set[str], b: Set[str]) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    denom = len(b)
    return round(inter / max(1, denom), 3)


# -------------------------------
# Text chunking for embeddings
# -------------------------------

def smart_chunk(text: str, max_chars: int = 1200, overlap: int = 150) -> List[str]:
    """
    Safe, deterministic chunker:
    - Clamps overlap to [0, max_chars-1] to avoid infinite loops.
    - Prefers breaking at '\n' or '. ' near the window end.
    - Guarantees forward progress and no empty/duplicate chunks.
    """
    if max_chars <= 0:
        raise ValueError("max_chars must be > 0")

    # Prevent non-progress when breaking long paragraphs
    overlap = max(0, min(overlap, max_chars - 1))

    # Normalize newlines and trim
    text = re.sub(r"\r\n?", "\n", text or "").strip()
    if not text:
        return []

    n = len(text)
    chunks: List[str] = []
    start = 0

    while start < n:
        window_end = min(n, start + max_chars)

        # Try to break nicely within the last 40% of the window
        nice_start = start + int(max_chars * 0.6)
        nice_start = min(nice_start, window_end)  # bound

        break_pos = -1
        # Prefer a newline
        if nice_start < window_end:
            break_pos = text.rfind("\n", nice_start, window_end)
        # Then a sentence boundary
        if break_pos == -1 and nice_start < window_end:
            break_pos = text.rfind(". ", nice_start, window_end)
        # Fallback: hard cut at window_end
        cut = (break_pos + 1) if (break_pos != -1 and break_pos > start) else window_end

        chunk = text[start:cut].strip()
        if chunk:
            chunks.append(chunk)

        if cut >= n:
            break

        # Advance with overlap; ensure progress by at least 1 char
        next_start = max(cut - overlap, start + 1)
        start = next_start

    return chunks


# -------------------------------
# Chroma bootstrap
# -------------------------------
CHROMA_DIR = os.getenv("CHROMA_DB_DIR", "./chroma")
CHROMA_COLLECTION = os.getenv("CHROMA_COLLECTION", "skillbridge_resumes")

chroma_client = None
resume_collection = None

def init_chroma():
    global chroma_client, resume_collection
    if not CHROMA_AVAILABLE:
        raise HTTPException(status_code=503, detail="ChromaDB not installed. pip install chromadb")
    if chroma_client is None:
        chroma_client = chromadb.PersistentClient(path=CHROMA_DIR)
    if resume_collection is None:
        # We pass embeddings manually in upsert, so we don't need to attach an embedding function here
        resume_collection = chroma_client.get_or_create_collection(name=CHROMA_COLLECTION)


# -------------------------------
# Schemas (Pydantic)
# -------------------------------
class ResumeJobMatchRequest(BaseModel):
    resume_text: str
    job_description: Optional[str] = ""
    job_title: Optional[str] = ""
    aspiring_job_titles: Optional[List[str]] = []
    with_ai_reasoning: bool = False


class ResumeJobMatchResponse(BaseModel):
    matched_skills: List[str]
    missing_skills: List[str]
    score: float = Field(ge=0.0, le=1.0)
    ai_reasoning: Optional[str] = None


class ResumeCoursesMatchRequest(BaseModel):
    resume_text: str
    course_titles: List[str]


class ResumeCoursesMatchResponse(BaseModel):
    results: List[Dict[str, Any]]


class MockInterviewRequest(BaseModel):
    resume_text: str
    job_title: Optional[str] = ""
    seniority: Optional[str] = "mid"
    count: Optional[int] = 12


class MockInterviewResponse(BaseModel):
    questions: str


class CourseAssessmentRequest(BaseModel):
    course_title: str
    count: Optional[int] = 18


class CourseAssessmentResponse(BaseModel):
    questions: str


class CareerGoalsReverseRequest(BaseModel):
    resume_text: str
    desired_job_title: str


class CareerGoalsReverseResponse(BaseModel):
    roadmap: str


class CareerSimulatorRequest(BaseModel):
    resume_text: str
    desired_job_title: str


class CareerSimulatorResponse(BaseModel):
    simulation: str


class PortfolioBuilderRequest(BaseModel):
    resume_text: str
    desired_job_title: str


class PortfolioBuilderResponse(BaseModel):
    portfolio_plan: str


# New models for resume ingestion + generation
class ResumeIngestResponse(BaseModel):
    doc_id: str
    chunks: int
    chars: int
    user_id: Optional[str] = None


class CoverLetterRequest(BaseModel):
    job_title: str
    company: Optional[str] = None
    job_description: str
    doc_id: str
    top_k: Optional[int] = 8


class CoverLetterResponse(BaseModel):
    cover_letter: str
    used_chunks: List[str]


class TailoredResumeRequest(BaseModel):
    job_title: str
    job_description: str
    doc_id: str
    top_k: Optional[int] = 8


class TailoredResumeResponse(BaseModel):
    tailored_resume: str
    used_chunks: List[str]


# -------------------------------
# App + CORS + LLM bootstrap
# -------------------------------
app = FastAPI(title="SkillBridge API (single-file)", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOW_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LLM: Optional[GeminiLLM] = None
try:
    LLM = GeminiLLM(
        api_key=os.getenv("GEMINI_API_KEY"),
        model_name=os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    )
except Exception as e:
    print(f"[LLM INIT] Using None. Reason: {e}")
    LLM = None  # Health will expose if LLM isn't ready


def require_llm():
    if LLM is None:
        raise HTTPException(
            status_code=503,
            detail="Gemini LLM not configured or unavailable. Set GEMINI_API_KEY and restart."
        )


# -------------------------------
# File extraction helpers
# -------------------------------
from fastapi import HTTPException, UploadFile
from pypdf import PdfReader
import io

# Optional fallback import
try:
    from pdfminer.high_level import extract_text as pdfminer_extract_text
    PDFMINER_AVAILABLE = True
except ImportError:
    PDFMINER_AVAILABLE = False

try:
    import docx
    DOCX_AVAILABLE = True
except ImportError:
    DOCX_AVAILABLE = False


def extract_text_from_uploadfile(f: UploadFile) -> str:
    name = (f.filename or "").lower()
    ctype = (f.content_type or "").lower()

    # --- TXT Parsing ---
    if name.endswith(".txt") or "text/plain" in ctype:
        data = f.file.read()
        return data.decode("utf-8", errors="ignore")

    # --- PDF Parsing ---
    if name.endswith(".pdf") or "pdf" in ctype:
        data = f.file.read()

        # Try with PyPDF (fast)
        try:
            reader = PdfReader(io.BytesIO(data))
            txt = []
            for page in reader.pages:
                page_text = page.extract_text() or ""
                txt.append(page_text)
            extracted = "\n".join(txt).strip()
            if extracted:
                return extracted
        except Exception as e:
            print(f"PyPDF failed: {e}")

        # Fallback to pdfminer (more accurate for scanned/text-heavy PDFs)
        if PDFMINER_AVAILABLE:
            try:
                extracted = pdfminer_extract_text(io.BytesIO(data))
                return extracted.strip()
            except Exception as e:
                print(f"pdfminer failed: {e}")

        raise HTTPException(500, "PDF parsing failed. Try installing pdfminer.six for better support.")

    # --- DOCX Parsing ---
    if name.endswith(".docx") or "officedocument.wordprocessingml.document" in ctype:
        if not DOCX_AVAILABLE:
            raise HTTPException(500, "DOCX parsing not available. pip install python-docx")
        data = f.file.read()
        document = docx.Document(io.BytesIO(data))
        paras = [p.text for p in document.paragraphs if p.text]
        return "\n".join(paras).strip()

    # --- Unsupported File Type ---
    raise HTTPException(400, "Unsupported file type. Use PDF, DOCX, or TXT.")


# -------------------------------
# Endpoints — Health
# -------------------------------
@app.get("/health")
def health():
    return {"ok": True, "llm": LLM is not None, "chroma": CHROMA_AVAILABLE}


# -------------------------------
# 1) Resume ↔ Job (existing)
# -------------------------------
@app.post("/match/resume-job", response_model=ResumeJobMatchResponse)
def match_resume_to_job(payload: ResumeJobMatchRequest):
    if not payload.resume_text.strip():
        raise HTTPException(400, "resume_text is required")

    resume_norm = normalize_text(payload.resume_text)
    resume_skills = simple_skill_set_from_text(resume_norm)

    job_keywords = set()
    if payload.job_description:
        job_keywords |= extract_keywords_from_job_text(payload.job_description)
    if payload.job_title:
        job_keywords |= set(normalize_text(payload.job_title).split())
    for title in payload.aspiring_job_titles or []:
        job_keywords |= set(normalize_text(title).split())

    matched = sorted(list(resume_skills & job_keywords))
    missing = sorted(list(job_keywords - resume_skills))
    score = compute_overlap_score(resume_skills, job_keywords)

    reasoning: Optional[str] = None
    if payload.with_ai_reasoning:
        require_llm()
        prompt = f"""
You are a career assistant. Given resume skills and job keywords, explain fit, gaps, and next steps.

Resume skills:
{sorted(list(resume_skills))[:200]}

Job keywords:
{sorted(list(job_keywords))[:200]}

Provide: 1) fit summary, 2) missing skill clusters, 3) quick upskilling ideas.
"""
        try:
            reasoning = LLM.generate_text(prompt)
        except Exception as e:
            raise HTTPException(status_code=502, detail=str(e))

    return ResumeJobMatchResponse(
        matched_skills=matched,
        missing_skills=missing,
        score=score,
        ai_reasoning=reasoning
    )


# -------------------------------
# 2) Resume ↔ Courses (existing)
# -------------------------------
@app.post("/match/resume-courses", response_model=ResumeCoursesMatchResponse)
def match_resume_to_courses(payload: ResumeCoursesMatchRequest):
    if not payload.resume_text.strip():
        raise HTTPException(400, "resume_text is required")
    if not payload.course_titles:
        raise HTTPException(400, "course_titles cannot be empty")

    resume_norm = normalize_text(payload.resume_text)
    resume_skills = simple_skill_set_from_text(resume_norm)

    results = []
    for title in payload.course_titles:
        course_keywords = set(normalize_text(title).split())
        missing = sorted(list(course_keywords - resume_skills))
        matched = sorted(list(course_keywords & resume_skills))
        score = compute_overlap_score(resume_skills, course_keywords)
        results.append({
            "course_title": title,
            "matched_skills": matched,
            "missing_skills": missing,
            "relevance_score": score
        })

    return ResumeCoursesMatchResponse(results=results)


# -------------------------------
# 3) Mock Interview (existing)
# -------------------------------
@app.post("/interview/questions", response_model=MockInterviewResponse)
def generate_mock_interview(payload: MockInterviewRequest):
    require_llm()
    n = payload.count or 12
    n = max(5, min(40, n))

    prompt = f"""
Act as a seasoned technical interviewer. Create {n} challenging, technical questions
tailored to a candidate with this resume and role.

Role: {payload.job_title or "N/A"}
Seniority: {payload.seniority or "mid"}
Resume (raw):
{payload.resume_text[:4000]}

Guidelines:
- Focus on hands-on knowledge (not trivia).
- Mix fundamentals + scenario-based questions.
- Output numbered list, 1–2 lines each.
"""
    try:
        text = LLM.generate_text(prompt)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return MockInterviewResponse(questions=text.strip())


# -------------------------------
# 4) Course Assessment (existing)
# -------------------------------
@app.post("/assessment/questions", response_model=CourseAssessmentResponse)
def generate_course_assessment(payload: CourseAssessmentRequest):
    require_llm()
    n = payload.count or 18
    n = max(10, min(30, n))

    prompt = f"""
You are an instructional designer. Create {n} **basic** assessment questions
to check a learner's understanding of the course: "{payload.course_title}".

Rules:
- Keep questions simple and beginner-friendly.
- Prefer a mix of short-answer and multiple-choice (mark MCQs with "(MCQ)")).
- No answers—questions only.
- Number the questions 1..{n}.
"""
    try:
        text = LLM.generate_text(prompt)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return CourseAssessmentResponse(questions=text.strip())


# -------------------------------
# 5) Career features (existing)
# -------------------------------
@app.post("/career/goals-reverse", response_model=CareerGoalsReverseResponse)
def career_goals_reverse(payload: CareerGoalsReverseRequest):
    require_llm()
    prompt = f"""
You are a career coach. Perform **reverse mapping** from the desired job to the candidate's current resume.

Desired Job Title: {payload.desired_job_title}
Resume (raw, truncated):
{payload.resume_text[:2000]}

Deliver (keep total under ~900 words):
1) Core competencies (grouped)
2) Gap analysis
3) Learning roadmap (30/60/90/180 days)
4) Project suggestions (with outcomes)
5) Quick-win improvements for resume/LinkedIn
Use concise bullets and clear headings.
"""
    try:
        text = LLM.generate_text(prompt, max_output_tokens=3072)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return CareerGoalsReverseResponse(roadmap=text.strip())


@app.post("/career/simulator", response_model=CareerSimulatorResponse)
def career_simulator(payload: CareerSimulatorRequest):
    require_llm()
    prompt = f"""
Simulate a realistic 1-week **career simulator** for a "{payload.desired_job_title}" candidate,
using the resume for context.

Resume (raw):
{payload.resume_text[:4000]}

Provide:
- Overview (role context and KPIs)
- Day-by-day plan (Mon..Fri) with 2–3 tasks/day
- Constraints and stakeholder interactions
- Artifacts to produce
- Self-evaluation rubric (scored criteria)
Keep it concise but actionable.
"""
    try:
        text = LLM.generate_text(prompt)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return CareerSimulatorResponse(simulation=text.strip())


@app.post("/portfolio/builder", response_model=PortfolioBuilderResponse)
def portfolio_builder(payload: PortfolioBuilderRequest):
    require_llm()
    prompt = f"""
You are a hiring manager. Create a **portfolio plan** for someone targeting "{payload.desired_job_title}".

Resume (raw):
{payload.resume_text[:4000]}

Deliver:
1) 3–5 project ideas (problem, dataset/source, stack, evaluation)
2) Milestone plan (2–4 weeks each)
3) README.md template for one flagship project (sections + sample bullets)
4) Optional extensions to demonstrate senior-level thinking
"""
    try:
        text = LLM.generate_text(prompt)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return PortfolioBuilderResponse(portfolio_plan=text.strip())


# =======================================================
# NEW: Vector pipeline — upload → extract → embed → Chroma
# =======================================================
@app.post("/resume/ingest", response_model=ResumeIngestResponse)
def resume_ingest(file: UploadFile = File(...), user_id: Optional[str] = Form(default=None)):
    if not CHROMA_AVAILABLE:
        raise HTTPException(503, "ChromaDB not installed. pip install chromadb")

    # 1) Extract text
    text = extract_text_from_uploadfile(file)
    if not text or len(text) < 20:
        raise HTTPException(400, "Could not extract meaningful text from file.")

    print(type(text), len(text))

    # 2) Chunk
    chunks = smart_chunk(text, max_chars=1200, overlap=150)
    if not chunks:
        raise HTTPException(400, "No chunks produced from resume text.")

    # 3) Embed
    try:
        vectors = embed_texts_with_gemini(chunks)
    except Exception as e:
        raise HTTPException(502, detail=f"Embedding failed: {e}")


    # 4) Store in Chroma
    init_chroma()
    doc_id = str(uuid.uuid4())
    ids: IDs = [f"{doc_id}_{i}" for i in range(len(chunks))]
    metadatas: Metadatas = [{"doc_id": doc_id, "user_id": user_id, "chunk_index": i} for i in range(len(chunks))]
    
    try:
        resume_collection.add(
            ids=ids,
            documents=chunks,            # store raw chunk text too
            embeddings=vectors,          # we supply embeddings
            metadatas=metadatas
        )
    except Exception as e:
        raise HTTPException(500, f"Chroma upsert failed: {e}")

    return ResumeIngestResponse(doc_id=doc_id, chunks=len(chunks), chars=len(text), user_id=user_id)


# ---------------------------------------
# Helper: retrieve top-k chunks for a job
# ---------------------------------------
def get_top_k_chunks(doc_id: str, job_text: str, top_k: int = 8) -> List[str]:
    init_chroma()
    # Query embedding for the job text
    try:
        query_vec = embed_texts_with_gemini([job_text])[0]
    except Exception as e:
        raise HTTPException(502, detail=f"Embedding failed: {e}")

    # Chroma query with metadata filter
    try:
        res = resume_collection.query(
            query_embeddings=[query_vec],
            n_results=max(1, min(top_k, 20)),
            where={"doc_id": doc_id}
        )
    except Exception as e:
        raise HTTPException(500, f"Chroma query failed: {e}")

    # res["documents"] is list of list
    docs = (res.get("documents") or [[]])[0]
    return docs


# ---------------------------------------
# Use vectors to generate a cover letter
# ---------------------------------------
@app.post("/jobs/cover-letter", response_model=CoverLetterResponse)
def generate_cover_letter(payload: CoverLetterRequest):
    require_llm()
    if not payload.doc_id or not payload.job_description.strip():
        raise HTTPException(400, "doc_id and job_description are required.")
    top_k = payload.top_k or 8

    chunks = get_top_k_chunks(payload.doc_id, f"{payload.job_title}\n{payload.job_description}", top_k=top_k)
    context = "\n\n---\n\n".join(chunks[:top_k])

    company = payload.company or "the company"
    prompt = f"""
You are an expert career writer. Draft a concise, compelling **cover letter** for the role:

Job Title: {payload.job_title}
Company: {company}

Job Description:
{payload.job_description}

Relevant Resume Context (semantic matches):
{context}

Requirements:
- Strong, specific alignment to the job description
- Professional tone (no fluff), 4–6 short paragraphs max
- Use concrete evidence from the context where helpful
- No formatting beyond paragraphs (no markdown lists)

Finish with a confident closing and a brief call to action.
"""
    try:
        letter = LLM.generate_text(prompt, max_output_tokens=1536)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    return CoverLetterResponse(cover_letter=letter.strip(), used_chunks=chunks[:top_k])


# ---------------------------------------
# Use vectors to generate a tailored resume
# ---------------------------------------
@app.post("/jobs/tailored-resume", response_model=TailoredResumeResponse)
def generate_tailored_resume(payload: TailoredResumeRequest):
    require_llm()
    if not payload.doc_id or not payload.job_description.strip():
        raise HTTPException(400, "doc_id and job_description are required.")
    top_k = payload.top_k or 8

    chunks = get_top_k_chunks(payload.doc_id, f"{payload.job_title}\n{payload.job_description}", top_k=top_k)
    context = "\n\n---\n\n".join(chunks[:top_k])

    prompt = f"""
You are a hiring manager. Create a **tailored resume** for this role using the candidate's most relevant experience.

Target Role: {payload.job_title}

Job Description:
{payload.job_description}

Relevant Resume Context (semantic matches):
{context}

Output (keep under ~900 words):
- Professional Summary (3–5 sentences; role-aligned, impact-oriented)
- Core Skills (bulleted, role-specific, 10–14 items)
- Experience (2–4 most relevant roles/projects; STAR-style bullets)
- Selected Projects (1–2, with tangible outcomes/metrics)
- Education/Certifications (brief)
Keep it concise, quantifiable, and aligned to the job description.
"""
    try:
        tailored = LLM.generate_text(prompt, max_output_tokens=2048)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    return TailoredResumeResponse(tailored_resume=tailored.strip(), used_chunks=chunks[:top_k])


# -------------------------------
# Run server (port 8000) when executed directly
# -------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
