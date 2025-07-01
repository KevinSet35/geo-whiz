import { Module } from '@nestjs/common';
import { CountriesModule } from '../countries/countries.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
    imports: [CountriesModule],
    controllers: [QuizController],
    providers: [QuizService],
})
export class QuizModule { }