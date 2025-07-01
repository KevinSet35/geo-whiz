import { Controller, Get, Param } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { GlobalLeaderboardDto, LeaderboardDto } from './dto/leaderboard.dto';

@Controller('leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get()
    getAllLeaderboards(): GlobalLeaderboardDto {
        return this.leaderboardService.getAllLeaderboards();
    }

    // IMPORTANT: Put specific routes BEFORE parameterized routes
    @Get('countries/available')
    getAvailableCountries(): string[] {
        return this.leaderboardService.getAvailableCountries();
    }

    // This parameterized route should come AFTER specific routes
    @Get(':countryCode')
    getLeaderboardByCountry(@Param('countryCode') countryCode: string): LeaderboardDto {
        return this.leaderboardService.getLeaderboardByCountry(countryCode.toUpperCase());
    }
}