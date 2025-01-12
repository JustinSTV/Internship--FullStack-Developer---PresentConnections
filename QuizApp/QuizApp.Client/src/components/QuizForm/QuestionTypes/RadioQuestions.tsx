import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Question } from '../../../types/quizTypes';

interface props {
  question: Question;
  onAnswer: (answerId: number) => void
}

const RadioQuesiton = ({ question, onAnswer }: props) => {
  return (
    <FormControl>
      <RadioGroup onChange={(e) => onAnswer(Number(e.target.value))}>
        {question.answers.map(answer => (
          <FormControlLabel 
            key={answer.id}
            value={answer.id}
            control={<Radio />}
            label={answer.text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
 
export default RadioQuesiton;
