// Controllers/QuizController.cs
using Microsoft.AspNetCore.Mvc;
using QuizApp.API.Models;
using QuizApp.API.Services;
using QuizApp.API.DTOs;
using QuizApp.API.Data;

namespace QuizApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly IQuizService _quizService;
    private readonly QuizDbContext _context;

    public QuizController(IQuizService quizService, QuizDbContext context)
    {
        _quizService = quizService;
        _context = context;
    }

    [HttpPost("submit")]
    public async Task<ActionResult<int>> SubmitQuiz(QuizAttemptDto attempt)
    {
      var score = await _quizService.CalculateScore(attempt);
    
      var quizAttempt = new QuizAttempt
      {
          Email = attempt.Email,
          Score = score,
          DateTime = DateTime.UtcNow
      };

      _context.QuizAttempts.Add(quizAttempt);
      await _context.SaveChangesAsync();

      return Ok(score);
    }

    [HttpGet("highscores")]
    public async Task<ActionResult<List<HighScoreDto>>> GetHighScores()
    {
      var highScores = await _quizService.GetHighScores();
    
      // Add positions after getting the ordered list
      for (int i = 0; i < highScores.Count; i++)
      {
          highScores[i].Position = i + 1;
      }
    
      return Ok(highScores);
    }
}