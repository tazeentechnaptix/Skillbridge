# # tests.py  --- for app.py backend API
# import os
# import json
# import requests

# BASE_URL = os.getenv("SKILLBRIDGE_BASE_URL", "http://127.0.0.1:8000")
# RESUME_PATH = os.getenv("SKILLBRIDGE_RESUME_PATH", os.path.join(os.getcwd(), "resume.pdf"))


# def pretty(title, obj, max_chars=1200):
#     text = obj if isinstance(obj, str) else json.dumps(obj, indent=2, ensure_ascii=False)
#     if len(text) > max_chars:
#         text = text[:max_chars] + " ... [truncated]"
#     print(f"\n=== {title} ===\n{text}")


# def call_json(method, path, json_body=None, timeout=60):
#     url = f"{BASE_URL}{path}"
#     try:
#         resp = requests.request(method, url, json=json_body, timeout=timeout)
#         try:
#             data = resp.json()
#         except Exception:
#             data = {"raw": resp.text}
#         return resp.status_code, data
#     except requests.RequestException as e:
#         return None, {"error": str(e), "url": url}


# def call_form_with_file(path, file_field_name, file_path, extra_form=None, timeout=300):
#     """
#     POST multipart/form-data with a file and optional extra form fields.
#     Uses a longer timeout (300s) to allow for PDF extraction + embeddings.
#     """
#     url = f"{BASE_URL}{path}"
#     if not os.path.isfile(file_path):
#         return None, {"error": f"File not found: {file_path}", "url": url}

#     files = {file_field_name: (os.path.basename(file_path), open(file_path, "rb"))}
#     data = extra_form or {}
#     try:
#         resp = requests.post(url, files=files, data=data, timeout=timeout)
#         try:
#             json_data = resp.json()
#         except Exception:
#             json_data = {"raw": resp.text}
#         return resp.status_code, json_data
#     except requests.RequestException as e:
#         return None, {"error": str(e), "url": url}
#     finally:
#         try:
#             files[file_field_name][1].close()
#         except Exception:
#             pass


# def main():
#     # 0) Health
#     code, data = call_json("GET", "/health")
#     pretty("HEALTH", {"status": code, "json": data})
#     if code != 200:
#         print("\n[ERROR] Server not healthy or not running. Start your FastAPI app and retry.")
#         return

#     llm_ready = bool(isinstance(data, dict) and data.get("llm"))
#     chroma_ready = bool(isinstance(data, dict) and data.get("chroma"))

#     # Sample payloads
#     resume_text = (
#         "Backend engineer with Python, FastAPI, Docker, PostgreSQL. "
#         "Built CI/CD with GitHub Actions, deployed on AWS ECS. "
#         "Worked with Kafka, Kubernetes, and microservices."
#     )
#     job_description = (
#         "Looking for a Backend Engineer experienced with Python, FastAPI, SQL, "
#         "Docker, AWS, Kafka, and Kubernetes. Bonus: system design skills."
#     )
#     job_title = "Backend Engineer"
#     aspiring = ["Senior Backend Engineer", "ML Engineer"]
#     courses = ["Intro to SQL", "Docker Fundamentals", "Kubernetes Basics", "TensorFlow for Beginners"]

#     # 1) Resume ↔ Job (no AI)
#     code, data = call_json("POST", "/match/resume-job", {
#         "resume_text": resume_text,
#         "job_description": job_description,
#         "job_title": job_title,
#         "aspiring_job_titles": aspiring,
#         "with_ai_reasoning": False
#     })
#     pretty("match/resume-job (no AI)", {"status": code, "json": data})

#     # 1b) Resume ↔ Job (with AI)
#     code, data = call_json("POST", "/match/resume-job", {
#         "resume_text": resume_text,
#         "job_description": job_description,
#         "job_title": job_title,
#         "aspiring_job_titles": aspiring,
#         "with_ai_reasoning": True
#     })
#     pretty("match/resume-job (with AI)", {"status": code, "json": data})

#     # 2) Resume ↔ Courses
#     code, data = call_json("POST", "/match/resume-courses", {
#         "resume_text": resume_text,
#         "course_titles": courses
#     })
#     pretty("match/resume-courses", {"status": code, "json": data})

#     # 3) Mock Interview (Technical)
#     code, data = call_json("POST", "/interview/questions", {
#         "resume_text": resume_text,
#         "job_title": "Backend Engineer",
#         "seniority": "junior",
#         "count": 12
#     })
#     pretty("interview/questions", {"status": code, "json": data})

#     # 4) Course Assessment
#     code, data = call_json("POST", "/assessment/questions", {
#         "course_title": "Introduction to Cloud Computing",
#         "count": 15
#     })
#     pretty("assessment/questions", {"status": code, "json": data})

#     # 5a) Career Goals Reverse Mapping
#     code, data = call_json("POST", "/career/goals-reverse", {
#         "resume_text": resume_text,
#         "desired_job_title": "Data Engineer"
#     })
#     pretty("career/goals-reverse", {"status": code, "json": data})

#     # 5b) Career Simulator
#     code, data = call_json("POST", "/career/simulator", {
#         "resume_text": resume_text,
#         "desired_job_title": "Product Manager"
#     })
#     pretty("career/simulator", {"status": code, "json": data})

#     # 5c) Portfolio Builder
#     code, data = call_json("POST", "/portfolio/builder", {
#         "resume_text": resume_text,
#         "desired_job_title": "Full-Stack Engineer"
#     })
#     pretty("portfolio/builder", {"status": code, "json": data})

#     # ============================
#     # 6) Vector pipeline (Chroma)
#     # ============================
#     if not chroma_ready:
#         print("\n[INFO] Chroma not available per /health; skipping vector pipeline (/resume/ingest, /jobs/*).")
#         print("      Make sure 'chromadb' is installed and restart the app.")
#         print("      pip install chromadb")
#         print("Done.\n")
#         return

#     BASE_URL = "http://localhost:8000"  # or your deployed endpoint
#     RESUME_PATH = "./resume.pdf"

#     def call_form_with_file(path, file_field_name, file_bytes, file_name, extra_form=None, timeout=300):
#         files = {
#             file_field_name: (file_name, file_bytes, "application/pdf")
#         }
#         data = extra_form or {}

#         response = requests.post(BASE_URL + path, files=files, data=data, timeout=timeout)
#         return response.status_code, response.json()

#     # 6a) /resume/ingest — upload ./resume.pdf
#     with open(RESUME_PATH, "rb") as f:
#         file_data = f.read()

#     code, data = call_form_with_file(
#         path="/resume/ingest",
#         file_field_name="file",
#         file_bytes=file_data,
#         file_name="resume.pdf",
#         extra_form={"user_id": "test-user"},
#     )

#     print("Status:", code)
#     print("Response:", data)



#     if code != 200 or not isinstance(data, dict) or "doc_id" not in data:
#         print("\n[INFO] Ingest did not return a doc_id; skipping downstream vector-based tests.")
#         print("      Ensure resume.pdf exists in the same folder or set SKILLBRIDGE_RESUME_PATH.")
#         print("Done.\n")
#         return

#     doc_id = data["doc_id"]

#     # 6b) /jobs/cover-letter
#     code, data = call_json("POST", "/jobs/cover-letter", {
#         "job_title": job_title,
#         "company": "Acme Corp",
#         "job_description": job_description,
#         "doc_id": doc_id,
#         "top_k": 8
#     })
#     pretty("jobs/cover-letter", {"status": code, "json": data})

#     # 6c) /jobs/tailored-resume
#     code, data = call_json("POST", "/jobs/tailored-resume", {
#         "job_title": job_title,
#         "job_description": job_description,
#         "doc_id": doc_id,
#         "top_k": 8
#     })
#     pretty("jobs/tailored-resume", {"status": code, "json": data})

#     print("\nDone.\n")


# if __name__ == "__main__":
#     main()


import os
import json
import requests
import pytest
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_URL = os.getenv("SKILLBRIDGE_BASE_URL", "http://127.0.0.1:8000")
RESUME_PATH = os.getenv("SKILLBRIDGE_RESUME_PATH", os.path.join(os.getcwd(), "resume.pdf"))

# Helper function to pretty print the response and save it to a file
def pretty(title, obj, max_chars=1200, save_to_file=False):
    text = obj if isinstance(obj, str) else json.dumps(obj, indent=2, ensure_ascii=False)
    if len(text) > max_chars:
        text = text[:max_chars] + " ... [truncated]"
    print(f"\n=== {title} ===\n{text}")
    
    # Save to a file if required
    if save_to_file:
        with open("test_responses.json", "a") as f:
            json.dump({title: obj}, f, indent=2)
            f.write("\n")  # Add a newline between different responses

# Helper function to call the API (GET or POST)
def call_json(method, path, json_body=None, timeout=60):
    url = f"{BASE_URL}{path}"
    try:
        resp = requests.request(method, url, json=json_body, timeout=timeout)
        try:
            data = resp.json()
        except Exception:
            data = {"raw": resp.text}
        return resp.status_code, data
    except requests.RequestException as e:
        return None, {"error": str(e), "url": url}

# Helper function to call API with a file upload
def call_form_with_file(path, file_field_name, file_bytes, file_name, extra_form=None, timeout=300):
    files = {
        file_field_name: (file_name, file_bytes, "application/pdf")
    }
    data = extra_form or {}

    response = requests.post(BASE_URL + path, files=files, data=data, timeout=timeout)
    return response.status_code, response.json()

# Test Health Endpoint
def test_health():
    code, data = call_json("GET", "/health")
    pretty("HEALTH", {"status": code, "json": data}, save_to_file=True)
    assert code == 200, f"Health check failed: {data}"
    print("Health Check: PASSED")

# Test Resume ↔ Job Match (without AI reasoning)
def test_resume_job_match_no_ai():
    resume_text = "Backend engineer with Python, FastAPI, Docker, PostgreSQL."
    job_description = "Looking for a Backend Engineer experienced with Python, FastAPI."
    job_title = "Backend Engineer"
    aspiring = ["Senior Backend Engineer"]

    code, data = call_json("POST", "/match/resume-job", {
        "resume_text": resume_text,
        "job_description": job_description,
        "job_title": job_title,
        "aspiring_job_titles": aspiring,
        "with_ai_reasoning": False
    })
    pretty("match/resume-job (no AI)", {"status": code, "json": data}, save_to_file=True)
    assert code == 200, f"Failed to match resume-job without AI: {data}"
    print("Resume ↔ Job (No AI) Match: PASSED")

# Test Resume ↔ Job Match (with AI reasoning)
def test_resume_job_match_with_ai():
    resume_text = "Backend engineer with Python, FastAPI, Docker, PostgreSQL."
    job_description = "Looking for a Backend Engineer experienced with Python, FastAPI."
    job_title = "Backend Engineer"
    aspiring = ["Senior Backend Engineer"]

    code, data = call_json("POST", "/match/resume-job", {
        "resume_text": resume_text,
        "job_description": job_description,
        "job_title": job_title,
        "aspiring_job_titles": aspiring,
        "with_ai_reasoning": True
    })
    pretty("match/resume-job (with AI)", {"status": code, "json": data}, save_to_file=True)
    assert code == 200, f"Failed to match resume-job with AI: {data}"
    print("Resume ↔ Job (With AI) Match: PASSED")

# Test Resume ↔ Courses Match
def test_resume_courses_match():
    resume_text = "Backend engineer with Python, FastAPI, Docker, PostgreSQL."
    courses = ["Intro to SQL", "Docker Fundamentals", "Kubernetes Basics"]

    code, data = call_json("POST", "/match/resume-courses", {
        "resume_text": resume_text,
        "course_titles": courses
    })
    pretty("match/resume-courses", {"status": code, "json": data}, save_to_file=True)
    assert code == 200, f"Failed to match resume-courses: {data}"
    print("Resume ↔ Courses Match: PASSED")

# Test Mock Interview
def test_mock_interview():
    resume_text = "Backend engineer with Python, FastAPI, Docker, PostgreSQL."
    job_title = "Backend Engineer"
    seniority = "junior"
    count = 12

    code, data = call_json("POST", "/interview/questions", {
        "resume_text": resume_text,
        "job_title": job_title,
        "seniority": seniority,
        "count": count
    })
    pretty("interview/questions", {"status": code, "json": data}, save_to_file=True)
    assert code == 200, f"Failed to generate interview questions: {data}"
    print("Mock Interview Generation: PASSED")

# Test Resume Upload and Cover Letter Generation
def test_resume_ingest_and_cover_letter():
    with open(RESUME_PATH, "rb") as f:
        file_data = f.read()

    # Ingest Resume
    code, data = call_form_with_file(
        path="/resume/ingest",
        file_field_name="file",
        file_bytes=file_data,
        file_name="resume.pdf",
        extra_form={"user_id": "test-user"}
    )
    pretty("resume/ingest", {"status": code, "json": data}, save_to_file=True)
    assert code == 200 and "doc_id" in data, f"Failed to ingest resume: {data}"
    print("Resume Ingest: PASSED")

    doc_id = data["doc_id"]

    # Generate Cover Letter
    job_title = "Backend Engineer"
    company = "Acme Corp"
    job_description = "Looking for a Backend Engineer with experience in Python and FastAPI."

    code, data = call_json("POST", "/jobs/cover-letter", {
        "job_title": job_title,
        "company": company,
        "job_description": job_description,
        "doc_id": doc_id,
        "top_k": 8
    })
    pretty("jobs/cover-letter", {"status": code, "json": data}, save_to_file=True)
    assert code == 200, f"Failed to generate cover letter: {data}"
    print("Cover Letter Generation: PASSED")

# Main test function
def main():
    # Run all tests
    test_health()
    test_resume_job_match_no_ai()
    test_resume_job_match_with_ai()
    test_resume_courses_match()
    test_mock_interview()
    test_resume_ingest_and_cover_letter()

    print("\nAll tests passed!")

if __name__ == "__main__":
    main()
