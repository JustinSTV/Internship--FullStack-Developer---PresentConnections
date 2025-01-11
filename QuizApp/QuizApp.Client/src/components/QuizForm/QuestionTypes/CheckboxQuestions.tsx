import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Question } from '../../../types/quizTypes';

interface Props {
  questions: Question;
  onAnswer: (answerIds: number[]) => void;
  selectedAnswerIds: number[];
}

const CheckBoxQuestions = ({ questions, onAnswer, selectedAnswerIds }: Props) => {

  const handleChange = (answerId: number) => {
    const newSelectedAnswers = selectedAnswerIds.includes(answerId)
      ? selectedAnswerIds.filter(id => id !== answerId)
      : [...selectedAnswerIds, answerId]

    onAnswer(newSelectedAnswers)
  }

  return (
    <FormControl component='fieldset'>
      <FormGroup>
        {questions.answers.map(answer => (
          <FormControlLabel
            key={answer.id}
            control={
              <Checkbox
                checked={selectedAnswerIds.includes(answer.id)}
                onChange={() => handleChange(answer.id)}
              />
            }
            label={answer.text}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
 
export default CheckBoxQuestions;