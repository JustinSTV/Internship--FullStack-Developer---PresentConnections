using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.API.Data;
using QuizApp.API.DTOs;
using QuizApp.API.Models;

namespace QuizApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly QuizDbContext _context;
    private readonly IMapper _mapper;

    public QuestionsController(QuizDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuestionDto>>> GetQuestions()
    {
        var questions = await _context.Questions
            .Include(q => q.Answers)
            .ToListAsync();
            
        var questionsDto = _mapper.Map<List<QuestionDto>>(questions);
        return Ok(questionsDto);
    }

    [HttpGet("test")]
    public ActionResult<string> Test()
    {
        return Ok("API is working!");
    }
}