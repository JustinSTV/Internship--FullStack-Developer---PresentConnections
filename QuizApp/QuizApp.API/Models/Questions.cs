namespace QuizApp.API.Models;

public enum QuestionType
{
    Radio,
    Checkbox,
    Text
}

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public List<Answer> Answers { get; set; } = new();
}

public class Answer
{
    public int Id { get; set; }
    public int QuestionId { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public Question Question { get; set; } = null!;
}