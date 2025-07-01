import { Injectable } from '@nestjs/common';
import { GlobalLeaderboardDto, LeaderboardDto, LeaderboardEntryDto } from './dto/leaderboard.dto';

// Define the interface for individual leaderboard entries
interface LeaderboardEntry {
    playerName: string;
    score: number;
    percentage: number;
    completedAt: Date;
}

// Define the exact country codes as a union type
type CountryCode = 'US' | 'FR' | 'JP' | 'BR' | 'AU' | 'DE' | 'IN' | 'CN' | 'GB' | 'IT' | 'ES' | 'CA';

// Define the type for the hardcoded data structure using strict country codes
type HardcodedLeaderboardData = Record<CountryCode, LeaderboardEntry[]>;

// Define strict country names type
type StrictCountryNames = Record<CountryCode, string>;

@Injectable()
export class LeaderboardService {
    // Hardcoded data for now - in production this would come from a database
    private readonly hardcodedData: HardcodedLeaderboardData = {
        'US': [
            { playerName: 'Alex Rodriguez', score: 19, percentage: 95, completedAt: new Date('2024-01-15') },
            { playerName: 'Sarah Johnson', score: 18, percentage: 90, completedAt: new Date('2024-01-14') },
            { playerName: 'Mike Chen', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Emma Wilson', score: 17, percentage: 85, completedAt: new Date('2024-01-12') },
            { playerName: 'David Brown', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Lisa Garcia', score: 16, percentage: 80, completedAt: new Date('2024-01-10') },
            { playerName: 'James Miller', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Jennifer Davis', score: 15, percentage: 75, completedAt: new Date('2024-01-08') },
            { playerName: 'Robert Taylor', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Amanda White', score: 14, percentage: 70, completedAt: new Date('2024-01-06') }
        ],
        'FR': [
            { playerName: 'Pierre Dubois', score: 18, percentage: 90, completedAt: new Date('2024-01-15') },
            { playerName: 'Marie Leclerc', score: 17, percentage: 85, completedAt: new Date('2024-01-14') },
            { playerName: 'Jean Martin', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Sophie Bernard', score: 16, percentage: 80, completedAt: new Date('2024-01-12') },
            { playerName: 'Paul Moreau', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Claire Rousseau', score: 15, percentage: 75, completedAt: new Date('2024-01-10') },
            { playerName: 'Antoine Petit', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Camille Durand', score: 14, percentage: 70, completedAt: new Date('2024-01-08') },
            { playerName: 'Nicolas Leroy', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Isabelle Girard', score: 13, percentage: 65, completedAt: new Date('2024-01-06') }
        ],
        'JP': [
            { playerName: 'Hiroshi Tanaka', score: 19, percentage: 95, completedAt: new Date('2024-01-15') },
            { playerName: 'Yuki Yamamoto', score: 18, percentage: 90, completedAt: new Date('2024-01-14') },
            { playerName: 'Kenji Sato', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Akiko Suzuki', score: 17, percentage: 85, completedAt: new Date('2024-01-12') },
            { playerName: 'Takeshi Watanabe', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Miki Nakamura', score: 16, percentage: 80, completedAt: new Date('2024-01-10') },
            { playerName: 'Ryoji Kobayashi', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Naomi Ito', score: 15, percentage: 75, completedAt: new Date('2024-01-08') },
            { playerName: 'Shinji Kato', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Rei Yoshida', score: 14, percentage: 70, completedAt: new Date('2024-01-06') }
        ],
        'BR': [
            { playerName: 'Carlos Silva', score: 18, percentage: 90, completedAt: new Date('2024-01-15') },
            { playerName: 'Ana Santos', score: 17, percentage: 85, completedAt: new Date('2024-01-14') },
            { playerName: 'João Oliveira', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Maria Costa', score: 16, percentage: 80, completedAt: new Date('2024-01-12') },
            { playerName: 'Pedro Rodrigues', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Lucia Fernandes', score: 15, percentage: 75, completedAt: new Date('2024-01-10') },
            { playerName: 'Rafael Almeida', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Beatriz Lima', score: 14, percentage: 70, completedAt: new Date('2024-01-08') },
            { playerName: 'Eduardo Pereira', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Fernanda Souza', score: 13, percentage: 65, completedAt: new Date('2024-01-06') }
        ],
        'AU': [
            { playerName: 'Jack Thompson', score: 19, percentage: 95, completedAt: new Date('2024-01-15') },
            { playerName: 'Sophie Anderson', score: 18, percentage: 90, completedAt: new Date('2024-01-14') },
            { playerName: 'Liam Mitchell', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Chloe Williams', score: 17, percentage: 85, completedAt: new Date('2024-01-12') },
            { playerName: 'Ryan Clark', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Emma Davis', score: 16, percentage: 80, completedAt: new Date('2024-01-10') },
            { playerName: 'Noah Wilson', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Olivia Moore', score: 15, percentage: 75, completedAt: new Date('2024-01-08') },
            { playerName: 'Ethan Taylor', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Isabella Brown', score: 14, percentage: 70, completedAt: new Date('2024-01-06') }
        ],
        'DE': [
            { playerName: 'Hans Mueller', score: 18, percentage: 90, completedAt: new Date('2024-01-15') },
            { playerName: 'Anna Schmidt', score: 17, percentage: 85, completedAt: new Date('2024-01-14') },
            { playerName: 'Klaus Weber', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Petra Fischer', score: 16, percentage: 80, completedAt: new Date('2024-01-12') },
            { playerName: 'Thomas Wagner', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Sabine Becker', score: 15, percentage: 75, completedAt: new Date('2024-01-10') },
            { playerName: 'Michael Schulz', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Andrea Richter', score: 14, percentage: 70, completedAt: new Date('2024-01-08') },
            { playerName: 'Wolfgang Koch', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Monika Krueger', score: 13, percentage: 65, completedAt: new Date('2024-01-06') }
        ],
        'IN': [
            { playerName: 'Raj Patel', score: 19, percentage: 95, completedAt: new Date('2024-01-15') },
            { playerName: 'Priya Sharma', score: 18, percentage: 90, completedAt: new Date('2024-01-14') },
            { playerName: 'Arjun Kumar', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Deepika Singh', score: 17, percentage: 85, completedAt: new Date('2024-01-12') },
            { playerName: 'Vikram Gupta', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Anita Verma', score: 16, percentage: 80, completedAt: new Date('2024-01-10') },
            { playerName: 'Rohit Jain', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Kavita Reddy', score: 15, percentage: 75, completedAt: new Date('2024-01-08') },
            { playerName: 'Suresh Yadav', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Meera Joshi', score: 14, percentage: 70, completedAt: new Date('2024-01-06') }
        ],
        'CN': [
            { playerName: 'Li Wei', score: 18, percentage: 90, completedAt: new Date('2024-01-15') },
            { playerName: 'Wang Mei', score: 17, percentage: 85, completedAt: new Date('2024-01-14') },
            { playerName: 'Zhang Jun', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Liu Yan', score: 16, percentage: 80, completedAt: new Date('2024-01-12') },
            { playerName: 'Chen Hao', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Yang Lin', score: 15, percentage: 75, completedAt: new Date('2024-01-10') },
            { playerName: 'Wu Gang', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Zhao Lei', score: 14, percentage: 70, completedAt: new Date('2024-01-08') },
            { playerName: 'Zhou Min', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Xu Fang', score: 13, percentage: 65, completedAt: new Date('2024-01-06') }
        ],
        'GB': [
            { playerName: 'James Smith', score: 19, percentage: 95, completedAt: new Date('2024-01-15') },
            { playerName: 'Emily Johnson', score: 18, percentage: 90, completedAt: new Date('2024-01-14') },
            { playerName: 'Oliver Williams', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Charlotte Brown', score: 17, percentage: 85, completedAt: new Date('2024-01-12') },
            { playerName: 'Harry Jones', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Amelia Garcia', score: 16, percentage: 80, completedAt: new Date('2024-01-10') },
            { playerName: 'George Miller', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Isla Davis', score: 15, percentage: 75, completedAt: new Date('2024-01-08') },
            { playerName: 'Jack Wilson', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Grace Moore', score: 14, percentage: 70, completedAt: new Date('2024-01-06') }
        ],
        'IT': [
            { playerName: 'Marco Rossi', score: 18, percentage: 90, completedAt: new Date('2024-01-15') },
            { playerName: 'Giulia Ferrari', score: 17, percentage: 85, completedAt: new Date('2024-01-14') },
            { playerName: 'Alessandro Russo', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Francesca Romano', score: 16, percentage: 80, completedAt: new Date('2024-01-12') },
            { playerName: 'Matteo Colombo', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Chiara Ricci', score: 15, percentage: 75, completedAt: new Date('2024-01-10') },
            { playerName: 'Lorenzo Marino', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Valentina Greco', score: 14, percentage: 70, completedAt: new Date('2024-01-08') },
            { playerName: 'Davide Bruno', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Sara Gallo', score: 13, percentage: 65, completedAt: new Date('2024-01-06') }
        ],
        'ES': [
            { playerName: 'Carlos García', score: 19, percentage: 95, completedAt: new Date('2024-01-15') },
            { playerName: 'María Rodríguez', score: 18, percentage: 90, completedAt: new Date('2024-01-14') },
            { playerName: 'Alejandro López', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Laura Martínez', score: 17, percentage: 85, completedAt: new Date('2024-01-12') },
            { playerName: 'David González', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Ana Hernández', score: 16, percentage: 80, completedAt: new Date('2024-01-10') },
            { playerName: 'Pablo Jiménez', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Carmen Ruiz', score: 15, percentage: 75, completedAt: new Date('2024-01-08') },
            { playerName: 'Javier Díaz', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Isabel Moreno', score: 14, percentage: 70, completedAt: new Date('2024-01-06') }
        ],
        'CA': [
            { playerName: 'John MacDonald', score: 18, percentage: 90, completedAt: new Date('2024-01-15') },
            { playerName: 'Sarah Thompson', score: 17, percentage: 85, completedAt: new Date('2024-01-14') },
            { playerName: 'Michael Wilson', score: 17, percentage: 85, completedAt: new Date('2024-01-13') },
            { playerName: 'Jennifer Martin', score: 16, percentage: 80, completedAt: new Date('2024-01-12') },
            { playerName: 'Robert Anderson', score: 16, percentage: 80, completedAt: new Date('2024-01-11') },
            { playerName: 'Lisa Taylor', score: 15, percentage: 75, completedAt: new Date('2024-01-10') },
            { playerName: 'Christopher Brown', score: 15, percentage: 75, completedAt: new Date('2024-01-09') },
            { playerName: 'Amanda Johnson', score: 14, percentage: 70, completedAt: new Date('2024-01-08') },
            { playerName: 'Daniel White', score: 14, percentage: 70, completedAt: new Date('2024-01-07') },
            { playerName: 'Michelle Davis', score: 13, percentage: 65, completedAt: new Date('2024-01-06') }
        ]
    } as const;

    private readonly countryNames: StrictCountryNames = {
        'US': 'United States',
        'FR': 'France',
        'JP': 'Japan',
        'BR': 'Brazil',
        'AU': 'Australia',
        'DE': 'Germany',
        'IN': 'India',
        'CN': 'China',
        'GB': 'United Kingdom',
        'IT': 'Italy',
        'ES': 'Spain',
        'CA': 'Canada'
    } as const;

    private static readonly TOTAL_QUESTIONS = 20;

    getLeaderboardByCountry(countryCode: string): LeaderboardDto {
        const entries = this.hardcodedData[countryCode as CountryCode] || [];
        const countryName = this.countryNames[countryCode as CountryCode] || countryCode;

        const leaderboardEntries: LeaderboardEntryDto[] = entries.map((entry, index) => ({
            rank: index + 1,
            playerName: entry.playerName,
            score: entry.score,
            totalQuestions: LeaderboardService.TOTAL_QUESTIONS,
            percentage: entry.percentage,
            completedAt: entry.completedAt,
            countryCode,
            countryName
        }));

        return {
            countryCode,
            countryName,
            entries: leaderboardEntries,
            totalPlayers: entries.length,
            lastUpdated: new Date()
        };
    }

    getAllLeaderboards(): GlobalLeaderboardDto {
        const leaderboards = Object.keys(this.hardcodedData).map(countryCode =>
            this.getLeaderboardByCountry(countryCode)
        );

        // Get top performers across all countries
        const allEntries: LeaderboardEntryDto[] = [];
        leaderboards.forEach(leaderboard => {
            allEntries.push(...leaderboard.entries);
        });

        // Sort by percentage descending, then by score descending
        const topPerformers = allEntries
            .sort((a, b) => {
                if (b.percentage !== a.percentage) {
                    return b.percentage - a.percentage;
                }
                return b.score - a.score;
            })
            .slice(0, 10)
            .map((entry, index) => ({
                ...entry,
                rank: index + 1
            }));

        return {
            leaderboards,
            topPerformers
        };
    }

    getAvailableCountries(): CountryCode[] {
        return Object.keys(this.hardcodedData) as CountryCode[];
    }
}