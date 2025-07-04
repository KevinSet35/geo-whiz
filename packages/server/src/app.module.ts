import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CountriesModule } from './modules/countries/countries.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';

@Module({
    imports: [
        UsersModule,
        CountriesModule,
        QuizModule,
        LeaderboardModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
