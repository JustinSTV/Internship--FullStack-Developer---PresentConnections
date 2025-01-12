import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Question } from '../../../types/quizTypes';

interface Props {
  question: Question;
  onAnswer: (answerIds: number[]) => void;
  selectedAnswerIds: number[];
}

const CheckBoxQuestions = ({ question, onAnswer, selectedAnswerIds }: Props) => {

  const handleChange = (answerId: number) => {
    //checking if answer is selected, if yes - remove it, else - add it
    const newSelectedAnswers = selectedAnswerIds.includes(answerId)
      ? selectedAnswerIds.filter(id => id !== answerId)
      : [...selectedAnswerIds, answerId]

    onAnswer(newSelectedAnswers)
  }

  return (
    <FormControl component='fieldset'>
      <FormGroup>
        {question.answers.map(answer => (
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