using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.API.Data;
using QuizApp.API.Models;

namespace QuizApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly QuizDbContext _context;

    public QuestionsController(QuizDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.Answers)
            .ToListAsync();
            
        return Ok(questions);
    }

    [HttpGet("test")]
    public ActionResult<string> Test()
    {
        return Ok("API is working!");
    }
}