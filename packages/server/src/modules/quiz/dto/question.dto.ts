export interface QuestionDto {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface QuizAnswerDto {
    questionId: number;
    userAnswer: number;
}

export interface QuizAnswerResultDto {
    questionId: number;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
}

export interface QuizSubmissionDto {
    countryCode: string;
    answers: QuizAnswerDto[];
}

export interface QuizResultDto {
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: QuizAnswerResultDto[];
}