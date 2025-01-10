using AutoMapper;
using QuizApp.API.Models;
using QuizApp.API.DTOs;

namespace QuizApp.API.Profiles;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Question, QuestionDto>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));
            
        CreateMap<Answer, AnswerDto>();
            
        CreateMap<QuizAttempt, HighScoreDto>()
            .ForMember(dest => dest.Position, opt => opt.Ignore());
    }
}