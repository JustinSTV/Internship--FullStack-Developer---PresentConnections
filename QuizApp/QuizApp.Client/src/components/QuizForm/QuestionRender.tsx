import { Question, QuizAnswer } from '../../types/quizTypes';
import RadioQuesiton from './QuestionTypes/RadioQuestions';
import CheckBoxQuestions from './QuestionTypes/CheckboxQuestions';
import TextQuestions from './QuestionTypes/TextQuestions';

interface Props {
  question: Question;
  currentAnswer?: QuizAnswer;
  onAnswer: (questionId: number, type: string, value: number[] | string) => void;
}

const QuestionRender = ({ question, currentAnswer, onAnswer }: Props) => {
  switch (question.type) {
    case 'Radio':
      return (
        <RadioQuesiton
          question={question}
          onAnswer={(answerId) => onAnswer(question.id, 'Radio', [answerId])}
        />
      );
    case 'Checkbox':
      return (
        <CheckBoxQuestions
          question={question}
          onAnswer={(answerIds) => onAnswer(question.id, 'Checkbox', answerIds)}
          selectedAnswerIds={currentAnswer?.selectedAnswerIds || []}
        />
      );
    case 'Text':
      return (
        <TextQuestions
          question={question}
          onAnswer={(text) => onAnswer(question.id, 'Text', text)}
          value={currentAnswer?.textAnswer || ''}
        />
      );
  }
}
 
export default QuestionRender;