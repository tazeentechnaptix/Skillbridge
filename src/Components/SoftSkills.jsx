import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button, Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, Typography, Paper
} from '@mui/material';
import { motion } from 'framer-motion';

// Styled Components
const Container = styled.div`
  background: linear-gradient(to bottom right, #d1f2eb, #ffffff);
  min-height: 100vh;
  padding: 3rem 1rem;
  color: #2b6777;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const QuestionCard = styled(Paper)`
  width: 320px;
  padding: 1.5rem;
  border-radius: 15px !important;
  background-color: #2b6777 !important;
  color: #e0f7f3 !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
`;

const ResultCard = styled(Paper)`
  width: 90%;
  padding: 2.5rem;
  margin: 2rem 0;
  background-color: #2b6777 !important;
  color: #e0f7f3 !important;
  border-radius: 20px !important;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2) !important;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 2rem;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    border-radius: 50px;
    background-color: #52ab98;
    color: white;
    text-transform: none;
    &:hover {
      background-color: #469d88;
    }
  }
`;

const improvementTips = {
  'Ignore it': 'Try to resolve conflicts through open communication.',
  'Wait for others to act': 'Take initiative and show leadership.',
  'Passive': 'Be more assertive and express yourself confidently.',
  'Aggressive': 'Practice empathy and respect in your communication.',
  'Randomly': 'Organize tasks using priority and deadlines.',
  'Argue back': 'Accept feedback with an open mind and improve.',
  'Take it personally': 'Separate feedback from personal feelings.',
  'Avoid work': 'Use stress management techniques like time-blocking.',
  'Solo player': 'Collaborate more and trust your teammates.',
  'Impulsive': 'Pause and evaluate before making decisions.',
  'Not adaptable': 'Welcome change as an opportunity to grow.',
};

const questions = [
  { id: 1, question: 'How do you handle conflict in a team?', options: ['Ignore it', 'Address it directly', 'Wait for others to act', 'Talk to a manager'] },
  { id: 2, question: 'What’s your communication style?', options: ['Assertive', 'Passive', 'Aggressive', 'Passive-Aggressive'] },
  { id: 3, question: 'How do you prioritize tasks?', options: ['By deadline', 'By importance', 'Randomly', 'Based on mood'] },
  { id: 4, question: 'How do you handle feedback?', options: ['Ignore it', 'Accept and reflect', 'Argue back', 'Take it personally'] },
  { id: 5, question: 'What motivates you?', options: ['Recognition', 'Money', 'Challenge', 'Learning'] },
  { id: 6, question: 'How do you manage time?', options: ['To-do list', 'Calendar', 'Improvise', 'Ask others'] },
  { id: 7, question: 'How do you work in a team?', options: ['Leader', 'Follower', 'Observer', 'Solo player'] },
  { id: 8, question: 'What’s your decision-making style?', options: ['Quick', 'Analytical', 'Impulsive', 'Emotional'] },
  { id: 9, question: 'How do you handle stress?', options: ['Exercise', 'Avoid work', 'Talk it out', 'Sleep'] },
  { id: 10, question: 'What’s your adaptability level?', options: ['Very adaptable', 'Somewhat adaptable', 'Rarely adaptable', 'Not adaptable'] },
];

export default function SoftSkillsForm() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  const getImprovementAreas = () => {
    return questions
      .filter(q => improvementTips[answers[q.id]])
      .map(q => ({
        question: q.question,
        answer: answers[q.id],
        suggestion: improvementTips[answers[q.id]],
      }));
  };

  return (
    <Container>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold' }}>Soft Skills Assessment</Typography>
        <Typography variant="subtitle1" style={{ color: '#444' }}>Answer honestly to understand your strengths and improvement areas.</Typography>
      </motion.div>

      {submitted ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ResultCard elevation={4}>
            <Typography variant="h5" gutterBottom>Your Personalized Feedback</Typography>
            <Typography variant="body1" gutterBottom style={{ marginBottom: '1rem' }}>
              Here are your results along with improvement suggestions:
            </Typography>
            {getImprovementAreas().length ? (
              getImprovementAreas().map((item, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <Typography variant="subtitle1"><strong>{item.question}</strong></Typography>
                  <Typography variant="body2" style={{ marginLeft: '1rem' }}>Your Answer: {item.answer}</Typography>
                  <Typography variant="body2" style={{ marginLeft: '1rem', color: '#ffcccb' }}>Suggestion: {item.suggestion}</Typography>
                </div>
              ))
            ) : (
              <Typography variant="h6" style={{ color: '#b2ff59' }}>Awesome! No major improvement areas detected. Keep it up!</Typography>
            )}

            <Typography variant="h6" style={{ marginTop: '2rem' }}>Your Responses:</Typography>
            {questions.map((q) => (
              <div key={q.id} style={{ marginTop: '0.8rem' }}>
                <Typography variant="subtitle2"><strong>{q.question}</strong></Typography>
                <Typography variant="body2">{answers[q.id]}</Typography>
              </div>
            ))}
          </ResultCard>
        </motion.div>
      ) : (
        <QuestionGrid>
          {questions.map((q, index) => (
            <motion.div key={q.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <QuestionCard elevation={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ color: '#e0f7f3', marginBottom: '0.5rem' }}>{q.question}</FormLabel>
                  <RadioGroup
                    value={answers[q.id] || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  >
                    {q.options.map((option, i) => (
                      <FormControlLabel
                        key={i}
                        value={option}
                        control={<Radio sx={{ color: '#e0f7f3', '&.Mui-checked': { color: '#b2dfdb' } }} />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </QuestionCard>
            </motion.div>
          ))}
        </QuestionGrid>
      )}

      {!submitted && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <StyledButton variant="contained" onClick={handleSubmit}>Submit</StyledButton>
        </motion.div>
      )}
    </Container>
  );
}
