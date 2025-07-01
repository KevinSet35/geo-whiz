// Updated DTOs to use strings instead of indexes

export interface QuestionDto {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string; // Changed from number to string
}

export interface QuizAnswerDto {
    questionId: number;
    userAnswer: string; // Changed from number to string
}

export interface QuizSubmissionDto {
    countryCode: string;
    answers: QuizAnswerDto[];
}

export interface QuizAnswerResultDto {
    questionId: number;
    userAnswer: string; // Changed from number to string
    correctAnswer: string; // Changed from number to string
    isCorrect: boolean;
}

export interface QuizResultDto {
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: QuizAnswerResultDto[];
}