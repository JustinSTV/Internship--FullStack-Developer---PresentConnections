using QuizApp.API.DTOs;

namespace QuizApp.API.Services;

public interface IQuizService
{
    Task<int> CalculateScore(QuizAttemptDto attempt);
    Task<List<HighScoreDto>> GetHighScores(int count = 10);
}