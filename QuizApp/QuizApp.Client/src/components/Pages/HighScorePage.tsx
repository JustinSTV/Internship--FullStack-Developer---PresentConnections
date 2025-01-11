import { useEffect, useState } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HighScore } from '../../types/quizTypes';
import { getHighScores } from '../../services/api';

const HighScorePage = () => {

  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handlePlayAgain = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const data = await getHighScores();
        setHighScores(data);
      } catch {
        setError('Failed to load high scores');
      } finally {
        setLoading(false);
      }
    };

    fetchHighScores();
    const interval = setInterval(fetchHighScores, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return { backgroundColor: '#FFD700' };
      case 2:
        return { backgroundColor: '#C0C0C0' };
      case 3:
        return { backgroundColor: '#CD7F32' };
      default:
        return {};
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        High Scores
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {highScores.map((score) => (
              <TableRow 
                key={`${score.email}-${score.dateTime}`}
                sx={getPositionStyle(score.position)}
              >
                <TableCell>{score.position}</TableCell>
                <TableCell>{score.email}</TableCell>
                <TableCell align="right">{score.score}</TableCell>
                <TableCell align="right">
                  {new Date(score.dateTime).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handlePlayAgain}
    >
    Play Again
    </Button>
  </Container>
  );
}
 
export default HighScorePage;