using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuizApp.API.Data;
using QuizApp.API.Models;
using QuizApp.API.DTOs;

namespace QuizApp.API.Services;

public class QuizService : IQuizService
{
    private readonly QuizDbContext _context;
    private readonly IMapper _mapper;

    public QuizService(QuizDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<int> CalculateScore(QuizAttemptDto attempt)
    {
        int totalScore = 0;
        var questions = await _context.Questions
            .Include(q => q.Answers)
            .ToDictionaryAsync(q => q.Id);

        foreach (var answer in attempt.Answers)
        {
            if (!questions.TryGetValue(answer.QuestionId, out var question))
                continue;

            switch (question.Type)
            {
                case QuestionType.Radio:
                    if (answer.SelectedAnswerIds.Count == 1 &&
                        question.Answers.Any(a => a.Id == answer.SelectedAnswerIds[0] && a.IsCorrect))
                        totalScore += 100;
                    break;

                case QuestionType.Checkbox:
                    var correctAnswers = question.Answers.Count(a => a.IsCorrect);
                    var selectedCorrect = question.Answers.Count(a => 
                        a.IsCorrect && answer.SelectedAnswerIds.Contains(a.Id));
                    
                    if (correctAnswers > 0)
                        totalScore += (int)Math.Ceiling((100.0 / correctAnswers) * selectedCorrect);
                    break;

                case QuestionType.Text:
                    if (question.Answers.Any(a => 
                        a.IsCorrect && 
                        a.Text.Equals(answer.TextAnswer, StringComparison.OrdinalIgnoreCase)))
                        totalScore += 100;
                    break;
            }
        }

        return totalScore;
    }

    public async Task<List<HighScoreDto>> GetHighScores(int count = 10)
    {
        return await _context.QuizAttempts
            .OrderByDescending(q => q.Score)
            .ThenByDescending(q => q.DateTime)
            .Take(count)
            .Select(q => new HighScoreDto
            {
                Position = 0, // Will be set after query
                Email = q.Email,
                Score = q.Score,
                DateTime = q.DateTime
            })
            .ToListAsync();
    }
}