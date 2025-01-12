import { TextField } from '@mui/material';
import { Question } from '../../../types/quizTypes';

interface Props {
  question: Question;
  onAnswer: (text: string) => void;
  value: string;
}

const TextQuestions = ({ question, onAnswer, value }: Props) => {
  return (
    <TextField
      fullWidth
      label={question.text}
      variant="outlined"
      value={value}
      onChange={(e) => onAnswer(e.target.value)}
      placeholder="Type your answer here..."
      margin="normal"
    />
  );
};

export default TextQuestions;