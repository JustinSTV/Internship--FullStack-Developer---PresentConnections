// Data/QuizDbContext.cs
using Microsoft.EntityFrameworkCore;
using QuizApp.API.Models;

namespace QuizApp.API.Data;

public class QuizDbContext : DbContext
{
    public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
    {
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<QuizAttempt> QuizAttempts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure relationships
        modelBuilder.Entity<Answer>()
            .HasOne(a => a.Question)
            .WithMany(q => q.Answers)
            .HasForeignKey(a => a.QuestionId);

        // Seed initial data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Add 10 sample questions with answers
        var questions = new[]
        {
            new Question { Id = 1, Text = "What is the capital of France?", Type = QuestionType.Radio },
            new Question { Id = 2, Text = "Which programming languages are object-oriented?", Type = QuestionType.Checkbox },
            // Add more questions...
        };

        var answers = new[]
        {
            new Answer { Id = 1, QuestionId = 1, Text = "Paris", IsCorrect = true },
            new Answer { Id = 2, QuestionId = 1, Text = "London", IsCorrect = false },
            new Answer { Id = 3, QuestionId = 2, Text = "Java", IsCorrect = true },
            new Answer { Id = 4, QuestionId = 2, Text = "C++", IsCorrect = true },
            // Add more answers...
        };

        modelBuilder.Entity<Question>().HasData(questions);
        modelBuilder.Entity<Answer>().HasData(answers);
    }
}