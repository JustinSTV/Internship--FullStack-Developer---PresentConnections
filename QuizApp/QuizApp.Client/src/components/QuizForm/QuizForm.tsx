import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import { Question, QuizAttempt, QuizAnswer } from '../../types/quizTypes';

import QuestionRender from './QuestionRender';
import EmailStep from './Steps/EmailSteps'

interface Props {
  questions: Question[];
  onSubmit: (attempt: QuizAttempt) => void;
}

const QuizForm = ({ questions, onSubmit }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const totalSteps = questions.length + 2;

  const isEmailStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;
  const currentQuestionIndex = activeStep - 1;

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleAnswer = (questionId: number, type: string, value: number[] | string) => {
    const answerIndex = answers.findIndex(a => a.questionId === questionId);
    const newAnswer: QuizAnswer = {
      questionId,
      selectedAnswerIds: type === 'Text' ? [] : value as number[],
      textAnswer: type === 'Text' ? value as string : undefined
    };

    if (answerIndex === -1) {
      setAnswers([...answers, newAnswer]);
    } else {
      const newAnswers = [...answers];
      newAnswers[answerIndex] = newAnswer;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      email,
      answers
    });
  };

  const getCurrentAnswer = (questionId: number): QuizAnswer | undefined => {
    return answers.find(a => a.questionId === questionId);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>Email</StepLabel>
      </Step>
      {questions.map((_, index) => (
        <Step key={index}>
          <StepLabel>{`Question ${index + 1}`}</StepLabel>
        </Step>
      ))}
    </Stepper>

    <Box sx={{ mt: 4, mb: 2 }}>
      {isEmailStep ? (
        <EmailStep email={email} onChange={setEmail}/>
      ) : isLastStep ? (
        <Typography>Review your answers and submit</Typography>
      ) : (
        questions[currentQuestionIndex] && (
          <Box>
            <Typography variant='h6' gutterBottom>
              {questions[currentQuestionIndex].text}
            </Typography>
            <QuestionRender
            question={questions[currentQuestionIndex]}
            currentAnswer={getCurrentAnswer(questions[currentQuestionIndex].id)}
            onAnswer={handleAnswer}
          />
          </Box>
        )
      )}
    </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
      >
        Back
      </Button>
      {isLastStep ? (
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!email || answers.length !== questions.length}
        >
          Submit
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={isEmailStep ? !email : !getCurrentAnswer(questions[activeStep - 1]?.id)}
        >
          Next
        </Button>
      )}
    </Box>
  </Box>
  );
}
 
export default QuizForm;