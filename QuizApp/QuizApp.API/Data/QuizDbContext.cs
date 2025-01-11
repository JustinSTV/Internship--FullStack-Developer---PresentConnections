// Data/QuizDbContext.cs
using Microsoft.EntityFrameworkCore;
using QuizApp.API.Models;

namespace QuizApp.API.Data;

public class QuizDbContext : DbContext
{
    public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<QuizAttempt> QuizAttempts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Answer>()
            .HasOne(a => a.Question)
            .WithMany(q => q.Answers)
            .HasForeignKey(a => a.QuestionId);

        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        
        var questions = new[]
        {
            new Question { Id = 1, Text = "What is the capital of France?", Type = QuestionType.Radio },
            new Question { Id = 2, Text = "Which planet is known as the Red Planet?", Type = QuestionType.Radio },
            new Question { Id = 3, Text = "Who painted the Mona Lisa?", Type = QuestionType.Radio },
            new Question { Id = 4, Text = "What is the largest ocean on Earth?", Type = QuestionType.Radio },
            
            // Text input questions (2)
            new Question { Id = 5, Text = "What is 2 + 2? (Enter the number)", Type = QuestionType.Text },
            new Question { Id = 6, Text = "What programming language is this quiz built with? (Backend)", Type = QuestionType.Text },
            
            // Checkbox questions (4)
            new Question { Id = 7, Text = "Which of these are primary colors?", Type = QuestionType.Checkbox },
            new Question { Id = 8, Text = "Select all programming languages:", Type = QuestionType.Checkbox },
            new Question { Id = 9, Text = "Which animals are mammals?", Type = QuestionType.Checkbox },
            new Question { Id = 10, Text = "Which of these are planets in our solar system?", Type = QuestionType.Checkbox }
        };

        var answers = new[]
            {
                // Answers for Question 1 - Capital of France
                new Answer { Id = 1, QuestionId = 1, Text = "Paris", IsCorrect = true },
                new Answer { Id = 2, QuestionId = 1, Text = "London", IsCorrect = false },
                new Answer { Id = 3, QuestionId = 1, Text = "Berlin", IsCorrect = false },
                
                // Answers for Question 2 - Red Planet
                new Answer { Id = 4, QuestionId = 2, Text = "Mars", IsCorrect = true },
                new Answer { Id = 5, QuestionId = 2, Text = "Venus", IsCorrect = false },
                new Answer { Id = 6, QuestionId = 2, Text = "Jupiter", IsCorrect = false },
                
                // Answers for Question 3 - Mona Lisa
                new Answer { Id = 7, QuestionId = 3, Text = "Leonardo da Vinci", IsCorrect = true },
                new Answer { Id = 8, QuestionId = 3, Text = "Pablo Picasso", IsCorrect = false },
                new Answer { Id = 9, QuestionId = 3, Text = "Vincent van Gogh", IsCorrect = false },
                
                // Answers for Question 4 - Largest Ocean
                new Answer { Id = 10, QuestionId = 4, Text = "Pacific Ocean", IsCorrect = true },
                new Answer { Id = 11, QuestionId = 4, Text = "Atlantic Ocean", IsCorrect = false },
                new Answer { Id = 12, QuestionId = 4, Text = "Indian Ocean", IsCorrect = false },
                
                // Answer for Question 5 - Math
                new Answer { Id = 13, QuestionId = 5, Text = "4", IsCorrect = true },
                
                // Answer for Question 6 - Programming Language
                new Answer { Id = 14, QuestionId = 6, Text = "C#", IsCorrect = true },
                
                // question 7 - primary colors
                new Answer { Id = 15, QuestionId = 7, Text = "Red", IsCorrect = true },
                new Answer { Id = 16, QuestionId = 7, Text = "Blue", IsCorrect = true },
                new Answer { Id = 17, QuestionId = 7, Text = "Yellow", IsCorrect = true },
                new Answer { Id = 18, QuestionId = 7, Text = "Green", IsCorrect = false },
                
                // question 8 - programming languages
                new Answer { Id = 19, QuestionId = 8, Text = "Python", IsCorrect = true },
                new Answer { Id = 20, QuestionId = 8, Text = "Java", IsCorrect = true },
                new Answer { Id = 21, QuestionId = 8, Text = "HTML", IsCorrect = false },
                new Answer { Id = 22, QuestionId = 8, Text = "C++", IsCorrect = true },
                
                // question 9 - mammals
                new Answer { Id = 23, QuestionId = 9, Text = "Dog", IsCorrect = true },
                new Answer { Id = 24, QuestionId = 9, Text = "Snake", IsCorrect = false },
                new Answer { Id = 25, QuestionId = 9, Text = "Whale", IsCorrect = true },
                new Answer { Id = 26, QuestionId = 9, Text = "Lizard", IsCorrect = false },
                
                // question 10 - planets
                new Answer { Id = 27, QuestionId = 10, Text = "Mercury", IsCorrect = true },
                new Answer { Id = 28, QuestionId = 10, Text = "Sun", IsCorrect = false },
                new Answer { Id = 29, QuestionId = 10, Text = "Venus", IsCorrect = true },
                new Answer { Id = 30, QuestionId = 10, Text = "Pluto", IsCorrect = false }
            };

        modelBuilder.Entity<Question>().HasData(questions);
        modelBuilder.Entity<Answer>().HasData(answers);
    }
}