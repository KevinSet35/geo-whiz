// leaderboard.dto.ts
export interface LeaderboardEntryDto {
    rank: number;
    playerName: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: Date;
    countryCode: string;
    countryName: string;
}

export interface LeaderboardDto {
    countryCode: string;
    countryName: string;
    entries: LeaderboardEntryDto[];
    totalPlayers: number;
    lastUpdated: Date;
}

export interface GlobalLeaderboardDto {
    leaderboards: LeaderboardDto[];
    topPerformers: LeaderboardEntryDto[];
}