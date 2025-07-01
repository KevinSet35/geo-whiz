import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { QuestionDto, QuizSubmissionDto, QuizResultDto } from './dto/question.dto';
import * as questionsData from './data/questions.json';
import { selectRandomElements, shuffleArray } from '@/utility/array.utils';

interface QuestionTemplate {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

@Injectable()
export class QuizService {

    private static readonly QUIZ_QUESTION_COUNT = 20;

    /**
     * Stores question templates organized by country code for efficient access.
     * Structure: Record<countryCode, Map<questionId, QuestionTemplate>>
     * 
     * Example:
     * {
     *   "US": Map { 1 => QuestionTemplate, 2 => QuestionTemplate, ... },
     *   "FR": Map { 1 => QuestionTemplate, 2 => QuestionTemplate, ... },
     *   "JP": Map { 1 => QuestionTemplate, 2 => QuestionTemplate, ... }
     * }
     * 
     * Benefits:
     * - O(1) country lookup by code
     * - O(1) question lookup by ID within a country
     * - Memory efficient compared to nested arrays
     * - Type-safe access to questions
     */
    private readonly questionTemplates: Record<string, Map<number, QuestionTemplate>>;


    constructor(private readonly countriesService: CountriesService) {
        // Transform the JSON data into Map structure for better performance
        this.questionTemplates = this.initializeQuestionTemplates();
    }

    getQuizQuestions(countryCode: string): QuestionDto[] {
        const questionMap = this.questionTemplates[countryCode];

        if (!questionMap) {
            // Return generic questions if country-specific questions are not available
            return this.getGenericQuestions(countryCode);
        }

        // Convert Map values to array for processing
        const questionsArray = Array.from(questionMap.values());
        const shuffledQuestions = this.selectRandomQuestions(questionsArray, QuizService.QUIZ_QUESTION_COUNT);
        const questionsWithShuffledOptions = this.shuffleQuestionOptions(shuffledQuestions);

        console.log('questionDTO:', questionsWithShuffledOptions);

        return questionsWithShuffledOptions;
    }

    submitQuiz(submission: QuizSubmissionDto): QuizResultDto {
        console.log('submission:', submission);
        // Get original questions Map to compare against
        const originalQuestionsMap = this.questionTemplates[submission.countryCode];

        if (!originalQuestionsMap) {
            throw new Error(`No questions found for country code: ${submission.countryCode}`);
        }

        let correctCount = 0;

        const results = submission.answers.map(answer => {
            // Find the original question by ID using Map.get() for O(1) lookup
            const originalQuestion = originalQuestionsMap.get(answer.questionId);
            if (!originalQuestion) {
                throw new Error(`Question with id ${answer.questionId} not found`);
            }

            // Compare the user's answer text with the correct answer text
            const isCorrect = answer.userAnswer === originalQuestion.correctAnswer;
            if (isCorrect) {
                correctCount++;
            }

            return {
                questionId: answer.questionId,
                userAnswer: answer.userAnswer,
                correctAnswer: originalQuestion.correctAnswer,
                isCorrect
            };
        });

        return {
            score: correctCount,
            totalQuestions: submission.answers.length,
            percentage: Math.round((correctCount / submission.answers.length) * 100),
            answers: results
        };
    }

    /**
     * Get a specific question by country code and question ID
     * This method leverages the Map structure for efficient lookups
     */
    getQuestionById(countryCode: string, questionId: number): QuestionTemplate | undefined {
        const questionMap = this.questionTemplates[countryCode];
        return questionMap?.get(questionId);
    }

    /**
     * Get all available country codes that have questions
     */
    getAvailableCountryCodes(): string[] {
        return Object.keys(this.questionTemplates);
    }

    /**
     * Get the total number of questions available for a country
     */
    getQuestionCount(countryCode: string): number {
        const questionMap = this.questionTemplates[countryCode];
        return questionMap?.size || 0;
    }

    /**
     * Check if questions exist for a given country code
     */
    hasQuestionsForCountry(countryCode: string): boolean {
        return this.getQuestionCount(countryCode) > 0;
    }

    /**
     * Randomly selects and shuffles a specified number of questions
     */
    private selectRandomQuestions(questions: QuestionTemplate[], count: number): QuestionTemplate[] {
        return selectRandomElements(questions, count);
    }

    /**
     * Shuffles the options for each question while keeping the correct answer as string
     */
    private shuffleQuestionOptions(questions: QuestionTemplate[]): QuestionDto[] {
        return questions.map(q => {
            const shuffledOptions = shuffleArray(q.options);

            return {
                ...q,
                options: shuffledOptions,
                correctAnswer: q.correctAnswer // Keep as string, not index
            };
        });
    }

    private getGenericQuestions(countryCode: string): QuestionDto[] {
        const country = this.countriesService.findByCode(countryCode);
        if (!country) {
            throw new Error(`Country with code ${countryCode} not found`);
        }

        const genericQuestions = [
            {
                id: 1,
                question: `What is the capital of ${country.name}?`,
                options: [country.capital || "Unknown", "Option B", "Option C", "Option D", "Option E"],
                correctAnswer: country.capital || "Unknown"
            },
            {
                id: 2,
                question: `What currency is used in ${country.name}?`,
                options: [country.currency || "Unknown", "Option B", "Option C", "Option D", "Option E"],
                correctAnswer: country.currency || "Unknown"
            },
            {
                id: 3,
                question: `What continent is ${country.name} located in?`,
                options: [country.continent || "Unknown", "Option B", "Option C", "Option D", "Option E"],
                correctAnswer: country.continent || "Unknown"
            },
            {
                id: 4,
                question: `What is the primary language in ${country.name}?`,
                options: [country.languages?.[0] || "Unknown", "Option B", "Option C", "Option D", "Option E"],
                correctAnswer: country.languages?.[0] || "Unknown"
            },
            {
                id: 5,
                question: `What is the approximate population of ${country.name}?`,
                options: [`${Math.round((country.population || 0) / 1000000)} million`, "Option B", "Option C", "Option D", "Option E"],
                correctAnswer: `${Math.round((country.population || 0) / 1000000)} million`
            },
        ];

        // Shuffle options for generic questions too, but keep correctAnswer as string
        return this.shuffleQuestionOptions(genericQuestions);
    }

    /**
     * Initialize question templates by transforming JSON data into Map structure for better performance
     */
    private initializeQuestionTemplates(): Record<string, Map<number, QuestionTemplate>> {
        const templates: Record<string, Map<number, QuestionTemplate>> = {};

        Object.entries(questionsData).forEach(([countryCode, questions]) => {
            const questionMap = new Map<number, QuestionTemplate>();
            questions.forEach((question: QuestionTemplate) => {
                questionMap.set(question.id, question);
            });
            templates[countryCode] = questionMap;
        });

        return templates;
    }

}