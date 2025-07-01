import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { QuestionDto, QuizSubmissionDto, QuizResultDto } from './dto/question.dto';

@Injectable()
export class QuizService {
    constructor(private readonly countriesService: CountriesService) { }

    private readonly questionTemplates = {
        'US': [
            { id: 1, question: "What is the capital of the United States?", options: ["New York", "Los Angeles", "Washington, D.C.", "Chicago", "Houston"], correctAnswer: 2 },
            { id: 2, question: "Which river is the longest in the United States?", options: ["Colorado River", "Mississippi River", "Columbia River", "Rio Grande", "Ohio River"], correctAnswer: 1 },
            { id: 3, question: "How many states are there in the United States?", options: ["48", "49", "50", "51", "52"], correctAnswer: 2 },
            { id: 4, question: "What is the currency of the United States?", options: ["Euro", "Pound", "Dollar", "Yen", "Peso"], correctAnswer: 2 },
            { id: 5, question: "Which mountain range runs along the western United States?", options: ["Appalachian Mountains", "Rocky Mountains", "Sierra Nevada", "Cascade Range", "Great Smoky Mountains"], correctAnswer: 1 },
            { id: 6, question: "What is the national bird of the United States?", options: ["Robin", "Cardinal", "Bald Eagle", "Blue Jay", "Hawk"], correctAnswer: 2 },
            { id: 7, question: "Which state is known as the 'Golden State'?", options: ["Texas", "Florida", "California", "Nevada", "Arizona"], correctAnswer: 2 },
            { id: 8, question: "What is the largest state by area in the United States?", options: ["Texas", "California", "Alaska", "Montana", "New Mexico"], correctAnswer: 2 },
            { id: 9, question: "Which Great Lake is entirely within the United States?", options: ["Lake Superior", "Lake Michigan", "Lake Huron", "Lake Erie", "Lake Ontario"], correctAnswer: 1 },
            { id: 10, question: "What is the national motto of the United States?", options: ["E Pluribus Unum", "In God We Trust", "Land of the Free", "United We Stand", "Liberty and Justice"], correctAnswer: 1 },
            { id: 11, question: "Which president is on Mount Rushmore along with Washington, Jefferson, and Lincoln?", options: ["Franklin Roosevelt", "Theodore Roosevelt", "John Adams", "Thomas Jefferson", "Andrew Jackson"], correctAnswer: 1 },
            { id: 12, question: "What is the smallest state by area?", options: ["Delaware", "Connecticut", "Rhode Island", "Vermont", "New Hampshire"], correctAnswer: 2 },
            { id: 13, question: "Which city is known as the 'Big Apple'?", options: ["Los Angeles", "Chicago", "New York City", "San Francisco", "Boston"], correctAnswer: 2 },
            { id: 14, question: "What is the national anthem of the United States?", options: ["God Bless America", "America the Beautiful", "The Star-Spangled Banner", "My Country 'Tis of Thee", "Battle Hymn of the Republic"], correctAnswer: 2 },
            { id: 15, question: "Which state is famous for its lobster?", options: ["Florida", "California", "Maine", "Alaska", "Louisiana"], correctAnswer: 2 },
            { id: 16, question: "What is the Grand Canyon located in?", options: ["Utah", "Colorado", "Arizona", "Nevada", "New Mexico"], correctAnswer: 2 },
            { id: 17, question: "Which ocean borders the United States on the west?", options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean", "Southern Ocean"], correctAnswer: 1 },
            { id: 18, question: "What is the tallest mountain in the United States?", options: ["Mount Whitney", "Mount Elbert", "Denali", "Mount Rainier", "Mount Washington"], correctAnswer: 2 },
            { id: 19, question: "Which state is known for its peaches?", options: ["Florida", "Georgia", "California", "Texas", "Arizona"], correctAnswer: 1 },
            { id: 20, question: "What is the most populous city in the United States?", options: ["Los Angeles", "Chicago", "New York City", "Houston", "Phoenix"], correctAnswer: 2 }
        ],
        'FR': [
            { id: 1, question: "What is the capital of France?", options: ["Lyon", "Marseille", "Paris", "Nice", "Toulouse"], correctAnswer: 2 },
            { id: 2, question: "Which river flows through Paris?", options: ["Loire", "Seine", "Rhône", "Garonne", "Dordogne"], correctAnswer: 1 },
            { id: 3, question: "What is France's national motto?", options: ["Vive la France", "Liberté, égalité, fraternité", "Honneur et patrie", "Dieu et mon droit", "L'union fait la force"], correctAnswer: 1 },
            { id: 4, question: "Which mountain range forms France's border with Spain?", options: ["Alps", "Vosges", "Pyrenees", "Jura", "Massif Central"], correctAnswer: 2 },
            { id: 5, question: "What is the currency of France?", options: ["Franc", "Euro", "Pound", "Dollar", "Mark"], correctAnswer: 1 },
            { id: 6, question: "Which famous museum is located in Paris?", options: ["British Museum", "Louvre", "Prado", "Hermitage", "Uffizi"], correctAnswer: 1 },
            { id: 7, question: "What is the famous tower in Paris called?", options: ["Big Ben", "Eiffel Tower", "Leaning Tower", "CN Tower", "Space Needle"], correctAnswer: 1 },
            { id: 8, question: "Which wine region is famous in France?", options: ["Tuscany", "Bordeaux", "Rioja", "Napa Valley", "Barossa"], correctAnswer: 1 },
            { id: 9, question: "What is the national symbol of France?", options: ["Eagle", "Lion", "Rooster", "Bear", "Wolf"], correctAnswer: 2 },
            { id: 10, question: "Which sea borders France to the south?", options: ["North Sea", "Baltic Sea", "Mediterranean Sea", "Black Sea", "Adriatic Sea"], correctAnswer: 2 },
            { id: 11, question: "What is the highest mountain in France?", options: ["Mont Blanc", "Pic du Midi", "Mont Ventoux", "Puy de Dôme", "Mont Cenis"], correctAnswer: 0 },
            { id: 12, question: "Which palace is famous for its Hall of Mirrors?", options: ["Louvre", "Versailles", "Fontainebleau", "Chambord", "Chenonceau"], correctAnswer: 1 },
            { id: 13, question: "What is the French national anthem?", options: ["La Marseillaise", "Chant du Départ", "Te Deum", "Domine Salvum", "Marche Henri IV"], correctAnswer: 0 },
            { id: 14, question: "Which region is famous for champagne?", options: ["Burgundy", "Champagne", "Alsace", "Loire Valley", "Provence"], correctAnswer: 1 },
            { id: 15, question: "What is the longest river in France?", options: ["Seine", "Loire", "Rhône", "Garonne", "Marne"], correctAnswer: 1 },
            { id: 16, question: "Which French city is famous for its film festival?", options: ["Paris", "Lyon", "Cannes", "Nice", "Marseille"], correctAnswer: 2 },
            { id: 17, question: "What is the traditional French pastry called?", options: ["Strudel", "Baklava", "Croissant", "Pretzel", "Donut"], correctAnswer: 2 },
            { id: 18, question: "Which island is a French territory in the Mediterranean?", options: ["Sicily", "Sardinia", "Corsica", "Crete", "Cyprus"], correctAnswer: 2 },
            { id: 19, question: "What is the famous French cheese from Normandy?", options: ["Brie", "Camembert", "Roquefort", "Gruyère", "Cheddar"], correctAnswer: 1 },
            { id: 20, question: "Which revolution began in France in 1789?", options: ["Industrial Revolution", "French Revolution", "American Revolution", "Russian Revolution", "Cultural Revolution"], correctAnswer: 1 }
        ],
        'JP': [
            { id: 1, question: "What is the capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima", "Nagoya"], correctAnswer: 2 },
            { id: 2, question: "What is Japan's highest mountain?", options: ["Mount Fuji", "Mount Kita", "Mount Hotaka", "Mount Yari", "Mount Tate"], correctAnswer: 0 },
            { id: 3, question: "Which currency is used in Japan?", options: ["Won", "Yuan", "Yen", "Dollar", "Ringgit"], correctAnswer: 2 },
            { id: 4, question: "What is the traditional Japanese garment called?", options: ["Hanbok", "Cheongsam", "Sari", "Kimono", "Ao dai"], correctAnswer: 3 },
            { id: 5, question: "Japan consists of how many main islands?", options: ["3", "4", "5", "6", "7"], correctAnswer: 1 },
            { id: 6, question: "What is the Japanese art of flower arrangement?", options: ["Origami", "Ikebana", "Bonsai", "Kabuki", "Haiku"], correctAnswer: 1 },
            { id: 7, question: "Which sea separates Japan from Korea?", options: ["East China Sea", "Sea of Japan", "Yellow Sea", "Philippine Sea", "South China Sea"], correctAnswer: 1 },
            { id: 8, question: "What is the traditional Japanese tea ceremony called?", options: ["Chanoyu", "Sashimi", "Tempura", "Sukiyaki", "Yakitori"], correctAnswer: 0 },
            { id: 9, question: "Which city was the former capital of Japan?", options: ["Tokyo", "Osaka", "Kyoto", "Nara", "Kamakura"], correctAnswer: 2 },
            { id: 10, question: "What is the Japanese martial art of sword fighting?", options: ["Karate", "Judo", "Kendo", "Aikido", "Sumo"], correctAnswer: 2 },
            { id: 11, question: "What is the largest island in Japan?", options: ["Honshu", "Hokkaido", "Kyushu", "Shikoku", "Okinawa"], correctAnswer: 0 },
            { id: 12, question: "What is the Japanese bullet train called?", options: ["Shinkansen", "Maglev", "Express", "Rapid", "Metro"], correctAnswer: 0 },
            { id: 13, question: "Which Japanese city is famous for its atomic bomb memorial?", options: ["Tokyo", "Osaka", "Hiroshima", "Nagoya", "Kobe"], correctAnswer: 2 },
            { id: 14, question: "What is the Japanese writing system that uses Chinese characters?", options: ["Hiragana", "Katakana", "Kanji", "Romaji", "Furigana"], correctAnswer: 2 },
            { id: 15, question: "Which Japanese food is raw fish?", options: ["Tempura", "Sushi", "Ramen", "Udon", "Miso"], correctAnswer: 1 },
            { id: 16, question: "What is the Japanese festival of cherry blossoms called?", options: ["Hanami", "Tanabata", "Obon", "Setsubun", "Shichi-Go-San"], correctAnswer: 0 },
            { id: 17, question: "Which Japanese company is famous for video games?", options: ["Sony", "Nintendo", "Panasonic", "Toshiba", "Hitachi"], correctAnswer: 1 },
            { id: 18, question: "What is the traditional Japanese wrestling called?", options: ["Karate", "Judo", "Sumo", "Aikido", "Kendo"], correctAnswer: 2 },
            { id: 19, question: "Which Japanese city hosted the 1964 Olympics?", options: ["Tokyo", "Osaka", "Kyoto", "Hiroshima", "Sapporo"], correctAnswer: 0 },
            { id: 20, question: "What is the Japanese art of paper folding?", options: ["Ikebana", "Origami", "Bonsai", "Calligraphy", "Pottery"], correctAnswer: 1 }
        ]
    };

    getQuizQuestions(countryCode: string): QuestionDto[] {
        const questions = this.questionTemplates[countryCode as keyof typeof this.questionTemplates];

        if (!questions) {
            // Return generic questions if country-specific questions are not available
            return this.getGenericQuestions(countryCode);
        }

        // Shuffle and return 20 questions
        return this.shuffleArray([...questions]).slice(0, 20);
    }

    private getGenericQuestions(countryCode: string): QuestionDto[] {
        const country = this.countriesService.findByCode(countryCode);
        if (!country) {
            throw new Error(`Country with code ${countryCode} not found`);
        }

        return [
            { id: 1, question: `What is the capital of ${country.name}?`, options: [country.capital || "Unknown", "Option B", "Option C", "Option D", "Option E"], correctAnswer: 0 },
            { id: 2, question: `What currency is used in ${country.name}?`, options: [country.currency || "Unknown", "Option B", "Option C", "Option D", "Option E"], correctAnswer: 0 },
            { id: 3, question: `What continent is ${country.name} located in?`, options: [country.continent || "Unknown", "Option B", "Option C", "Option D", "Option E"], correctAnswer: 0 },
            { id: 4, question: `What is the primary language in ${country.name}?`, options: [country.languages?.[0] || "Unknown", "Option B", "Option C", "Option D", "Option E"], correctAnswer: 0 },
            { id: 5, question: `What is the approximate population of ${country.name}?`, options: [`${Math.round((country.population || 0) / 1000000)} million`, "Option B", "Option C", "Option D", "Option E"], correctAnswer: 0 },
        ];
    }

    submitQuiz(submission: QuizSubmissionDto): QuizResultDto {
        const questions = this.getQuizQuestions(submission.countryCode);
        let correctCount = 0;

        const results = submission.answers.map(answer => {
            const question = questions.find(q => q.id === answer.questionId);
            if (!question) {
                throw new Error(`Question with id ${answer.questionId} not found`);
            }

            const isCorrect = answer.userAnswer === question.correctAnswer;
            if (isCorrect) {
                correctCount++;
            }

            return {
                questionId: answer.questionId,
                userAnswer: answer.userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect
            };
        });

        return {
            score: correctCount,
            totalQuestions: questions.length,
            percentage: Math.round((correctCount / questions.length) * 100),
            answers: results
        };
    }

    private shuffleArray<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!];
        }
        return shuffled;
    }
}