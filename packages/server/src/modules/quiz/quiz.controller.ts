import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuestionDto, QuizSubmissionDto, QuizResultDto } from './dto/question.dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) { }

    @Get(':countryCode')
    getQuizQuestions(@Param('countryCode') countryCode: string): QuestionDto[] {
        return this.quizService.getQuizQuestions(countryCode);
    }

    @Post('submit')
    submitQuiz(@Body() submission: QuizSubmissionDto): QuizResultDto {
        return this.quizService.submitQuiz(submission);
    }
}