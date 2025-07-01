import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { keyframes } from '@mui/system';
import {
    Quiz as QuizIcon,
    Leaderboard as LeaderboardIcon,
    Home as HomeIcon,
} from '@mui/icons-material';
import CountryQuizApp from './CountryQuizApp';
import LeaderboardComponent from './LeaderboardComponent';

// Global Animations (shared across the app)
export const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const slideInUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Global Theme Configuration
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#667eea',
            light: '#9bb5ff',
            dark: '#3f51b5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#764ba2',
            light: '#a478d4',
            dark: '#4a2c72',
            contrastText: '#ffffff',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
        },
        background: {
            default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            paper: '#ffffff',
        },
        text: {
            primary: '#1f2937',
            secondary: '#6b7280',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3.5rem',
            fontWeight: 800,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1f2937',
        },
        h3: {
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#374151',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#374151',
        },
        h6: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#6b7280',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '12px 24px',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px 0 rgba(0,0,0,0.3)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: 'rgba(103, 126, 234, 0.1)',
                },
                bar: {
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: 6,
                },
            },
        },
    },
});

// Navigation Component
interface NavigationProps {
    currentPage: string;
    onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => (
    <AppBar
        position="static"
        elevation={0}
        sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
    >
        <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Typography variant="h6" sx={{
                    fontWeight: 800,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    🌍 GeoQuiz
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant={currentPage === 'quiz' ? 'contained' : 'outlined'}
                        startIcon={<QuizIcon />}
                        onClick={() => onPageChange('quiz')}
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            backgroundColor: currentPage === 'quiz' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderColor: 'white',
                            },
                        }}
                    >
                        Take Quiz
                    </Button>

                    <Button
                        variant={currentPage === 'leaderboard' ? 'contained' : 'outlined'}
                        startIcon={<LeaderboardIcon />}
                        onClick={() => onPageChange('leaderboard')}
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            backgroundColor: currentPage === 'leaderboard' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderColor: 'white',
                            },
                        }}
                    >
                        Leaderboard
                    </Button>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
);

// Background Floating Elements Component
const FloatingElements: React.FC = () => (
    <>
        <Box
            sx={{
                position: 'fixed',
                top: '10%',
                left: '5%',
                fontSize: '3rem',
                opacity: 0.3,
                animation: `${float} 8s ease-in-out infinite`,
                animationDelay: '0s',
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                zIndex: 0,
            }}
        >
            🗺️
        </Box>
        <Box
            sx={{
                position: 'fixed',
                top: '20%',
                right: '8%',
                fontSize: '2.5rem',
                opacity: 0.3,
                animation: `${float} 10s ease-in-out infinite`,
                animationDelay: '2s',
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                zIndex: 0,
            }}
        >
            🧭
        </Box>
        <Box
            sx={{
                position: 'fixed',
                bottom: '15%',
                left: '10%',
                fontSize: '2.8rem',
                opacity: 0.3,
                animation: `${float} 12s ease-in-out infinite`,
                animationDelay: '4s',
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                zIndex: 0,
            }}
        >
            🏔️
        </Box>
        <Box
            sx={{
                position: 'fixed',
                bottom: '25%',
                right: '5%',
                fontSize: '2.6rem',
                opacity: 0.3,
                animation: `${float} 9s ease-in-out infinite`,
                animationDelay: '1s',
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                zIndex: 0,
            }}
        >
            🏛️
        </Box>
        <Box
            sx={{
                position: 'fixed',
                top: '60%',
                left: '3%',
                fontSize: '2.2rem',
                opacity: 0.25,
                animation: `${float} 11s ease-in-out infinite`,
                animationDelay: '3s',
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                zIndex: 0,
            }}
        >
            🌎
        </Box>
        <Box
            sx={{
                position: 'fixed',
                top: '40%',
                right: '12%',
                fontSize: '2.4rem',
                opacity: 0.25,
                animation: `${float} 13s ease-in-out infinite`,
                animationDelay: '5s',
                pointerEvents: 'none',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                zIndex: 0,
            }}
        >
            🌍
        </Box>
    </>
);

// Main App Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box
        sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                pointerEvents: 'none',
            },
        }}
    >
        {children}
        <FloatingElements />
    </Box>
);

function App() {
    const [currentPage, setCurrentPage] = useState<string>('quiz');

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'quiz':
                return <CountryQuizApp />;
            case 'leaderboard':
                return <LeaderboardComponent />;
            default:
                return <CountryQuizApp />;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppLayout>
                <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
                {renderCurrentPage()}
            </AppLayout>
        </ThemeProvider>
    );
}

export default App;