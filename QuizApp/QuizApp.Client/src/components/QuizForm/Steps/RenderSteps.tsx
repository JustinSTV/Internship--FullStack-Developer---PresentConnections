import { Step, StepLabel, Stepper } from '@mui/material';
import { Question } from '../../../types/quizTypes';

interface Props {
  activeStep: number;
  questions: Question[];
}

const RenderSteps = ({ activeStep, questions }: Props) => {
  return (
    <Stepper 
      activeStep={activeStep}
      alternativeLabel
    >
      {questions.map((_, index) => (
        <Step key={index}>
          <StepLabel>{`Question ${index + 1}`}</StepLabel>
        </Step>
      ))}
      <Step key="review">
        <StepLabel>Review</StepLabel>
      </Step>
    </Stepper>
  );
};

export default RenderSteps;