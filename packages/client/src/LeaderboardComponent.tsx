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
    Paper,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Tab,
    CircularProgress,
    Stack,
    Divider,
    Slide,
    useTheme,
} from '@mui/material';
import {
    EmojiEvents as TrophyIcon,
    WorkspacePremium as MedalIcon,
    Leaderboard as LeaderboardIcon,
    Public as GlobalIcon,
    Flag as FlagIcon,
    Star as StarIcon,
    Schedule as TimeIcon,
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

// Types matching backend DTOs
interface LeaderboardEntry {
    rank: number;
    playerName: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: Date;
    countryCode: string;
    countryName: string;
}

interface CountryLeaderboard {
    countryCode: string;
    countryName: string;
    entries: LeaderboardEntry[];
    totalPlayers: number;
    lastUpdated: Date;
}

interface GlobalLeaderboard {
    leaderboards: CountryLeaderboard[];
    topPerformers: LeaderboardEntry[];
}

interface Country {
    code: string;
    name: string;
    flag: string;
}

// API Service
const leaderboardApiService = {
    getAllLeaderboards: async (): Promise<GlobalLeaderboard> => {
        const response = await api.get('/leaderboard');
        return response.data;
    },

    getCountryLeaderboard: async (countryCode: string): Promise<CountryLeaderboard> => {
        const response = await api.get(`/leaderboard/${countryCode}`);
        return response.data;
    },

    getCountries: async (): Promise<Country[]> => {
        const response = await api.get('/countries');
        return response.data;
    },
};

const LeaderboardComponent: React.FC = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [selectedCountry, setSelectedCountry] = useState<string>('US');
    const [globalData, setGlobalData] = useState<GlobalLeaderboard | null>(null);
    const [countryData, setCountryData] = useState<CountryLeaderboard | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        loadCountries();
        loadGlobalLeaderboard();
    }, []);

    useEffect(() => {
        if (selectedCountry && tabValue === 1) {
            loadCountryLeaderboard(selectedCountry);
        }
    }, [selectedCountry, tabValue]);

    const loadCountries = async () => {
        try {
            const fetchedCountries = await leaderboardApiService.getCountries();
            setCountries(fetchedCountries);
        } catch (error) {
            console.error('Failed to load countries:', error);
            setError('Failed to load countries');
        }
    };

    const loadGlobalLeaderboard = async () => {
        try {
            setLoading(true);
            const data = await leaderboardApiService.getAllLeaderboards();
            setGlobalData(data);
        } catch (error) {
            console.error('Failed to load global leaderboard:', error);
            setError('Failed to load leaderboard data');
        } finally {
            setLoading(false);
        }
    };

    const loadCountryLeaderboard = async (countryCode: string) => {
        try {
            setLoading(true);
            const data = await leaderboardApiService.getCountryLeaderboard(countryCode);
            setCountryData(data);
        } catch (error) {
            console.error('Failed to load country leaderboard:', error);
            setError('Failed to load country leaderboard');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        if (newValue === 1 && selectedCountry) {
            loadCountryLeaderboard(selectedCountry);
        }
    };

    const handleCountryChange = (countryCode: string) => {
        setSelectedCountry(countryCode);
        if (tabValue === 1) {
            loadCountryLeaderboard(countryCode);
        }
    };

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <TrophyIcon sx={{ color: '#FFD700', fontSize: 28 }} />;
            case 2:
                return <MedalIcon sx={{ color: '#C0C0C0', fontSize: 26 }} />;
            case 3:
                return <MedalIcon sx={{ color: '#CD7F32', fontSize: 24 }} />;
            default:
                return (
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            fontSize: '0.875rem',
                            bgcolor: 'primary.main',
                        }}
                    >
                        {rank}
                    </Avatar>
                );
        }
    };

    const getPercentageColor = (percentage: number) => {
        if (percentage >= 90) return 'success';
        if (percentage >= 80) return 'warning';
        if (percentage >= 70) return 'info';
        return 'error';
    };

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const renderFloatingHeader = () => (
        <Box textAlign="center" mb={6}>
            <Box
                sx={{
                    animation: `${float} 6s ease-in-out infinite`,
                    fontSize: 80,
                    mb: 2,
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                }}
            >
                🏆
            </Box>
            <Typography variant="h1" sx={{
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                color: 'white',
                background: 'none',
                WebkitBackgroundClip: 'unset',
                WebkitTextFillColor: 'white',
            }}>
                Global Leaderboard
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                See how you rank against geography experts worldwide
            </Typography>
        </Box>
    );

    const renderTabSection = () => (
        <Card elevation={15} sx={{ mb: 4 }}>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                sx={{
                    '& .MuiTab-root': {
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        px: 4,
                        py: 2,
                    },
                }}
            >
                <Tab
                    icon={<GlobalIcon />}
                    label="Global Champions"
                    iconPosition="start"
                />
                <Tab
                    icon={<FlagIcon />}
                    label="Country Rankings"
                    iconPosition="start"
                />
            </Tabs>
        </Card>
    );

    const renderCountrySelector = () => {
        if (tabValue !== 1) return null;

        return (
            <Card elevation={10} sx={{ mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                            Select Country
                        </InputLabel>
                        <Select
                            value={selectedCountry}
                            label="Select Country"
                            onChange={(e) => handleCountryChange(e.target.value)}
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
                </CardContent>
            </Card>
        );
    };

    const renderLeaderboardTable = (entries: LeaderboardEntry[], title: string, showCountry = false) => (
        <Slide direction="up" in timeout={500}>
            <Card elevation={15}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LeaderboardIcon color="primary" />
                            {title}
                        </Typography>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'primary.main' }}>
                                    <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                        Rank
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                        Player
                                    </TableCell>
                                    {showCountry && (
                                        <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                            Country
                                        </TableCell>
                                    )}
                                    <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                        Score
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                        Percentage
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
                                        Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {entries.map((entry, index) => (
                                    <TableRow
                                        key={`${entry.countryCode}-${entry.rank}`}
                                        sx={{
                                            '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                            '&:hover': { bgcolor: 'action.selected' },
                                        }}
                                    >
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                {getRankIcon(entry.rank)}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body1" fontWeight={600}>
                                                {entry.playerName}
                                            </Typography>
                                        </TableCell>
                                        {showCountry && (
                                            <TableCell>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <Typography sx={{ fontSize: '1.2em' }}>
                                                        {countries.find(c => c.code === entry.countryCode)?.flag || '🏳️'}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {entry.countryName}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            <Typography variant="body1" fontWeight={600}>
                                                {entry.score}/{entry.totalQuestions}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={`${entry.percentage}%`}
                                                color={getPercentageColor(entry.percentage)}
                                                variant="filled"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <TimeIcon fontSize="small" color="action" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {formatDate(entry.completedAt)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Slide>
    );

    const renderGlobalStats = () => {
        if (!globalData) return null;

        const totalPlayers = globalData.leaderboards.reduce((sum, lb) => sum + lb.totalPlayers, 0);
        const avgScore = globalData.topPerformers.length > 0
            ? globalData.topPerformers.reduce((sum, entry) => sum + entry.percentage, 0) / globalData.topPerformers.length
            : 0;
        const topCountry = globalData.leaderboards.sort((a, b) => b.totalPlayers - a.totalPlayers)[0];

        return (
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Card elevation={8} sx={{ flex: 1, minWidth: 200 }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" color="primary" fontWeight={800}>
                            {totalPlayers}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Total Players
                        </Typography>
                    </CardContent>
                </Card>
                <Card elevation={8} sx={{ flex: 1, minWidth: 200 }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" color="secondary" fontWeight={800}>
                            {Math.round(avgScore)}%
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Top 10 Average
                        </Typography>
                    </CardContent>
                </Card>
                <Card elevation={8} sx={{ flex: 1, minWidth: 200 }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" color="success.main" fontWeight={800}>
                            {globalData.leaderboards.length}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Countries
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Card elevation={10} sx={{ textAlign: 'center', p: 6 }}>
                    <CircularProgress size={60} sx={{ mb: 3 }} />
                    <Typography variant="h6" color="text.secondary">
                        Loading leaderboard data...
                    </Typography>
                </Card>
            );
        }

        if (tabValue === 0) {
            return (
                <Box>
                    {renderGlobalStats()}
                    {globalData?.topPerformers && renderLeaderboardTable(
                        globalData.topPerformers,
                        "🌍 Global Champions",
                        true
                    )}
                </Box>
            );
        }

        if (tabValue === 1) {
            return (
                <Box>
                    {countryData && renderLeaderboardTable(
                        countryData.entries,
                        `${countries.find(c => c.code === selectedCountry)?.flag || '🏳️'} ${countryData.countryName} Leaderboard`
                    )}
                </Box>
            );
        }

        return null;
    };

    return (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
            {renderFloatingHeader()}
            {renderTabSection()}
            {renderCountrySelector()}
            {renderContent()}

            {error && (
                <Card elevation={8} sx={{ mt: 4, bgcolor: 'error.light', color: 'white' }}>
                    <CardContent>
                        <Typography variant="h6">
                            {error}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default LeaderboardComponent;