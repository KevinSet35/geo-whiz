import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    LinearProgress,
    Chip,
    Paper,
    Alert,
    Fade,
    Slide,
    CircularProgress,
    Divider,
    Avatar,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip,
    Zoom,
} from '@mui/material';
import {
    Quiz as QuizIcon,
    EmojiEvents as TrophyIcon,
    Refresh as RefreshIcon,
    Flag as FlagIcon,
    ExpandMore as ExpandMoreIcon,
    CheckCircle as CheckIcon,
    Cancel as CancelIcon,
    ArrowForward as ArrowForwardIcon,
    Psychology as BrainIcon,
    Star as StarIcon,
    Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { float, pulse, sparkle } from './App';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types
interface Country {
    code: string;
    name: string;
    flag: string;
}

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizAnswer {
    questionId: number;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
}

interface QuizResult {
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: QuizAnswer[];
}

interface QuizSubmission {
    countryCode: string;
    answers: {
        questionId: number;
        userAnswer: number;
    }[];
}

// API Service
const apiService = {
    getCountries: async (): Promise<Country[]> => {
        const response = await api.get('/countries');
        return response.data;
    },

    getQuizQuestions: async (countryCode: string): Promise<Question[]> => {
        const response = await api.get(`/quiz/${countryCode}`);
        return response.data;
    },

    submitQuiz: async (submission: QuizSubmission): Promise<QuizResult> => {
        const response = await api.post('/quiz/submit', submission);
        return response.data;
    },
};

const CountryQuizApp: React.FC = () => {
    const [step, setStep] = useState<'select' | 'quiz' | 'results'>('select');
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCountryName, setSelectedCountryName] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<QuizResult | null>(null);
    const [error, setError] = useState<string>('');

    // Load countries on component mount
    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        try {
            setLoading(true);
            setError('');
            const fetchedCountries = await apiService.getCountries();
            setCountries(fetchedCountries);
        } catch (error) {
            console.error('Failed to load countries:', error);
            setError('Failed to load countries. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const startQuiz = async () => {
        if (!selectedCountry) return;

        setLoading(true);
        setError('');
        try {
            const fetchedQuestions = await apiService.getQuizQuestions(selectedCountry);
            setQuestions(fetchedQuestions);
            setStep('quiz');
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setSelectedAnswer(-1);
        } catch (error) {
            console.error('Failed to start quiz:', error);
            setError('Failed to load quiz questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCountrySelect = (countryCode: string) => {
        setSelectedCountry(countryCode);
        const country = countries.find(c => c.code === countryCode);
        setSelectedCountryName(country?.name || '');
    };

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNextQuestion = () => {
        const newAnswers = [...userAnswers, selectedAnswer];
        setUserAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(-1);
        } else {
            submitQuiz(newAnswers);
        }
    };

    const submitQuiz = async (answers: number[]) => {
        setLoading(true);
        setError('');
        try {
            const submission: QuizSubmission = {
                countryCode: selectedCountry,
                answers: answers
                    .map((answer, index) => {
                        const questionId = questions[index]?.id;
                        if (questionId === undefined) return null;
                        return { questionId, userAnswer: answer };
                    })
                    .filter((item): item is { questionId: number; userAnswer: number } => item !== null)
            };

            const result = await apiService.submitQuiz(submission);
            setResult(result);
            setStep('results');
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            setError('Failed to submit quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetQuiz = () => {
        setStep('select');
        setSelectedCountry('');
        setSelectedCountryName('');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setSelectedAnswer(-1);
        setResult(null);
        setError('');
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'success';
        if (percentage >= 60) return 'warning';
        return 'error';
    };

    const getScoreMessage = (percentage: number) => {
        if (percentage >= 90) return 'Outstanding! You\'re a geography expert! 🏆';
        if (percentage >= 80) return 'Excellent work! Great knowledge! 🌟';
        if (percentage >= 70) return 'Good job! Keep learning! 👍';
        if (percentage >= 60) return 'Not bad! Room for improvement! 📚';
        return 'Keep studying and try again! 💪';
    };

    const getScoreIcon = (percentage: number) => {
        if (percentage >= 80) return <TrophyIcon sx={{ fontSize: 80, color: 'gold' }} />;
        if (percentage >= 60) return <StarIcon sx={{ fontSize: 80, color: 'orange' }} />;
        return <BrainIcon sx={{ fontSize: 80, color: 'gray' }} />;
    };

    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
            {/* Floating Header */}
            <Zoom in timeout={800}>
                <Box textAlign="center" mb={6}>
                    <Box
                        sx={{
                            animation: `${float} 6s ease-in-out infinite`,
                            fontSize: 100,
                            mb: 2,
                            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                        }}
                    >
                        🌍
                    </Box>
                    <Typography variant="h1" sx={{
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        color: 'white',
                        background: 'none',
                        WebkitBackgroundClip: 'unset',
                        WebkitTextFillColor: 'white',
                    }}>
                        World Geography Quiz
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                        Embark on a journey to test your global knowledge
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                sx={{
                                    color: 'rgba(255,255,255,0.6)',
                                    animation: `${sparkle} 2s ease-in-out infinite`,
                                    animationDelay: `${i * 0.2}s`,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Zoom>

            {/* Error Alert */}
            {error && (
                <Fade in>
                    <Alert
                        severity="error"
                        icon={<CancelIcon />}
                        sx={{
                            mb: 3,
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
                        }}
                        onClose={() => setError('')}
                    >
                        {error}
                    </Alert>
                </Fade>
            )}

            {/* Loading State */}
            {loading && step === 'select' && (
                <Slide direction="up" in timeout={600}>
                    <Card elevation={10} sx={{ textAlign: 'center', p: 4, mb: 4 }}>
                        <CircularProgress size={60} sx={{ mb: 3, color: 'primary.main' }} />
                        <Typography variant="h6" color="text.secondary">
                            Loading countries...
                        </Typography>
                    </Card>
                </Slide>
            )}

            {/* Country Selection */}
            {step === 'select' && !loading && countries.length > 0 && (
                <Slide direction="up" in timeout={600}>
                    <Card
                        elevation={15}
                        sx={{
                            p: 4,
                            mb: 4,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                            },
                        }}
                    >
                        <CardContent>
                            <Box textAlign="center" mb={4}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'primary.main',
                                        width: 80,
                                        height: 80,
                                        mx: 'auto',
                                        mb: 2,
                                        animation: `${pulse} 2s ease-in-out infinite`,
                                    }}
                                >
                                    <FlagIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Typography variant="h2" gutterBottom>
                                    Choose Your Adventure
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    Select a country to begin your geographical journey
                                </Typography>
                            </Box>

                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <InputLabel
                                    sx={{
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    Country
                                </InputLabel>
                                <Select
                                    value={selectedCountry}
                                    label="Country"
                                    onChange={(e) => handleCountrySelect(e.target.value)}
                                    sx={{
                                        borderRadius: 3,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderWidth: 2,
                                        },
                                    }}
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.code}>
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Typography sx={{ fontSize: '1.5em' }}>
                                                    {country.flag}
                                                </Typography>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {country.name}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box textAlign="center">
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={startQuiz}
                                    disabled={!selectedCountry || loading}
                                    startIcon={loading ? <CircularProgress size={20} /> : <QuizIcon />}
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        fontSize: '1.2rem',
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                        },
                                    }}
                                >
                                    {loading ? 'Preparing Quiz...' : 'Start Adventure'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Slide>
            )}

            {/* Quiz Questions */}
            {step === 'quiz' && questions.length > 0 && (
                <Fade in timeout={400}>
                    <Card elevation={15}>
                        <CardContent sx={{ p: 4 }}>
                            {/* Progress Section */}
                            <Box mb={4}>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="h4" color="primary">
                                        Question {currentQuestionIndex + 1} of {questions.length}
                                    </Typography>
                                    <Chip
                                        label={`${Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%`}
                                        color="primary"
                                        variant="filled"
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            px: 2,
                                            py: 1,
                                        }}
                                    />
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={(currentQuestionIndex + 1) / questions.length * 100}
                                    sx={{
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: 'rgba(103, 126, 234, 0.1)',
                                        '& .MuiLinearProgress-bar': {
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            borderRadius: 6,
                                        },
                                    }}
                                />
                            </Box>

                            {/* Question Card */}
                            <Paper
                                elevation={8}
                                sx={{
                                    p: 4,
                                    mb: 4,
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h3" fontWeight={700}>
                                    {questions[currentQuestionIndex]?.question}
                                </Typography>
                            </Paper>

                            {/* Answer Options */}
                            <RadioGroup
                                value={selectedAnswer}
                                onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                            >
                                <Stack spacing={2}>
                                    {questions[currentQuestionIndex]?.options.map((option, index) => (
                                        <Paper
                                            key={index}
                                            elevation={selectedAnswer === index ? 8 : 2}
                                            sx={{
                                                p: 0,
                                                borderRadius: 3,
                                                border: selectedAnswer === index ? 3 : 1,
                                                borderColor: selectedAnswer === index ? 'primary.main' : 'divider',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                transform: selectedAnswer === index ? 'scale(1.02)' : 'scale(1)',
                                                background: selectedAnswer === index
                                                    ? 'linear-gradient(135deg, rgba(103, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                                                    : 'white',
                                                '&:hover': {
                                                    transform: 'scale(1.01)',
                                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                },
                                            }}
                                            onClick={() => handleAnswerSelect(index)}
                                        >
                                            <FormControlLabel
                                                value={index}
                                                control={<Radio sx={{ mr: 2 }} />}
                                                label={
                                                    <Typography variant="h6" sx={{ py: 2, fontWeight: 500 }}>
                                                        {option}
                                                    </Typography>
                                                }
                                                sx={{ width: '100%', m: 0, px: 3 }}
                                            />
                                        </Paper>
                                    ))}
                                </Stack>
                            </RadioGroup>

                            {/* Next Button */}
                            <Box mt={4} textAlign="center">
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleNextQuestion}
                                    disabled={selectedAnswer === -1 || loading}
                                    endIcon={
                                        loading ? (
                                            <CircularProgress size={20} />
                                        ) : currentQuestionIndex === questions.length - 1 ? (
                                            <CelebrationIcon />
                                        ) : (
                                            <ArrowForwardIcon />
                                        )
                                    }
                                    sx={{
                                        px: 4,
                                        py: 2,
                                        fontSize: '1.1rem',
                                        background: currentQuestionIndex === questions.length - 1
                                            ? 'linear-gradient(45deg, #10b981, #059669)'
                                            : 'linear-gradient(45deg, #667eea, #764ba2)',
                                        '&:hover': {
                                            background: currentQuestionIndex === questions.length - 1
                                                ? 'linear-gradient(45deg, #059669, #047857)'
                                                : 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                        },
                                    }}
                                >
                                    {loading
                                        ? 'Processing...'
                                        : currentQuestionIndex === questions.length - 1
                                            ? 'Finish Quiz'
                                            : 'Next Question'
                                    }
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
            )}

            {/* Results */}
            {step === 'results' && result && (
                <Fade in timeout={600}>
                    <Card elevation={15}>
                        <CardContent sx={{ p: 4 }}>
                            {/* Results Header */}
                            <Box textAlign="center" mb={4}>
                                <Box sx={{ mb: 3, animation: `${pulse} 2s ease-in-out infinite` }}>
                                    {getScoreIcon(result.percentage)}
                                </Box>
                                <Typography variant="h2" gutterBottom>
                                    Quiz Complete!
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    You explored <strong>{selectedCountryName}</strong>
                                </Typography>
                            </Box>

                            {/* Score Cards */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: 3,
                                    mb: 4
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography variant="h2" fontWeight={800}>
                                            {result.score}
                                        </Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                            Correct Answers
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            background: 'linear-gradient(135deg, #764ba2, #667eea)',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography variant="h2" fontWeight={800}>
                                            {result.totalQuestions}
                                        </Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                            Total Questions
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            background: result.percentage >= 80
                                                ? 'linear-gradient(135deg, #10b981, #059669)'
                                                : result.percentage >= 60
                                                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                                    : 'linear-gradient(135deg, #ef4444, #dc2626)',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography variant="h2" fontWeight={800}>
                                            {result.percentage}%
                                        </Typography>
                                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                            Final Score
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Box>

                            {/* Score Message */}
                            <Alert
                                severity={getScoreColor(result.percentage)}
                                sx={{
                                    mb: 4,
                                    borderRadius: 3,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                }}
                                icon={<CelebrationIcon fontSize="large" />}
                            >
                                {getScoreMessage(result.percentage)}
                            </Alert>

                            {/* Detailed Results */}
                            <Box mb={4}>
                                <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                                    📊 Detailed Review
                                </Typography>
                                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {result.answers.map((answer, index) => (
                                        <Accordion key={index} elevation={2} sx={{ mb: 1 }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{
                                                    bgcolor: answer.isCorrect ? 'success.light' : 'error.light',
                                                    color: 'white',
                                                    '& .MuiAccordionSummary-content': {
                                                        alignItems: 'center',
                                                    },
                                                }}
                                            >
                                                <Box display="flex" alignItems="center" gap={2} width="100%">
                                                    {answer.isCorrect ? (
                                                        <CheckIcon />
                                                    ) : (
                                                        <CancelIcon />
                                                    )}
                                                    <Typography fontWeight={600}>
                                                        Question {index + 1}
                                                    </Typography>
                                                    <Box flexGrow={1} />
                                                    <Chip
                                                        label={answer.isCorrect ? 'Correct' : 'Incorrect'}
                                                        color={answer.isCorrect ? 'success' : 'error'}
                                                        variant="filled"
                                                        size="small"
                                                    />
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ p: 3 }}>
                                                <Stack spacing={2}>
                                                    <Typography variant="h6" fontWeight={600}>
                                                        {questions[index]?.question}
                                                    </Typography>
                                                    <Divider />
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Your Answer:
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                p: 2,
                                                                bgcolor: answer.isCorrect ? 'success.light' : 'error.light',
                                                                color: 'white',
                                                                borderRadius: 2,
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {questions[index]?.options[answer.userAnswer]}
                                                        </Typography>
                                                    </Box>
                                                    {!answer.isCorrect && (
                                                        <Box>
                                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                                Correct Answer:
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    p: 2,
                                                                    bgcolor: 'success.light',
                                                                    color: 'white',
                                                                    borderRadius: 2,
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                {questions[index]?.options[answer.correctAnswer]}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Box textAlign="center">
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={resetQuiz}
                                        startIcon={<RefreshIcon />}
                                        sx={{
                                            px: 4,
                                            py: 2,
                                            fontSize: '1.1rem',
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                                            },
                                        }}
                                    >
                                        Try Another Country
                                    </Button>
                                    <Tooltip title="Share your results!">
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            startIcon={<StarIcon />}
                                            sx={{
                                                px: 4,
                                                py: 2,
                                                fontSize: '1.1rem',
                                                borderColor: 'primary.main',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'primary.light',
                                                    color: 'white',
                                                },
                                            }}
                                            onClick={() => {
                                                const shareText = `I just scored ${result.percentage}% on the ${selectedCountryName} Geography Quiz! 🌍✨`;
                                                if (navigator.share) {
                                                    navigator.share({ text: shareText });
                                                } else {
                                                    navigator.clipboard.writeText(shareText);
                                                }
                                            }}
                                        >
                                            Share Results
                                        </Button>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
            )}
        </Container>
    );
};

export default CountryQuizApp;