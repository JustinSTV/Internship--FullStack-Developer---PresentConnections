// DTOs/QuestionDto.cs
namespace QuizApp.API.DTOs;

public class QuestionDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public List<AnswerDto> Answers { get; set; } = new();
}

public class AnswerDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
}

public class QuizAttemptDto
{
    public string Email { get; set; } = string.Empty;
    public List<QuizAnswerDto> Answers { get; set; } = new();
}

public class QuizAnswerDto
{
    public int QuestionId { get; set; }
    public List<int> SelectedAnswerIds { get; set; } = new();
    public string? TextAnswer { get; set; }
}

public class HighScoreDto
{
    public int Position { get; set; }
    public string Email { get; set; } = string.Empty;
    public int Score { get; set; }
    public DateTime DateTime { get; set; }
}