import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Question, QuizAttempt } from '../../types/quizTypes';
import { getQuestions, submitQuiz } from '../../services/api';
import QuizForm from '../QuizForm/QuizForm';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {

  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try{
        const data = await getQuestions();
        console.log("fetching questions", data)
        setQuestions(data)
      } catch(err){
        console.log(err)
        setError('Failed to load questions');
      } finally{
        setLoading(false)
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (attempt: QuizAttempt) => {
    try {
      await submitQuiz(attempt);
      navigate('/high-scores');
    } catch (err) {
      console.log(err)
      setError('Failed to submit quiz');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Quiz
        </Typography>
        <QuizForm
          questions={questions}
          onSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}
 
export default QuizPage;