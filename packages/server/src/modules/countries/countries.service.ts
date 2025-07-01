import { Injectable } from '@nestjs/common';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountriesService {
    private readonly countries: CountryDto[] = [
        {
            code: 'US',
            name: 'United States',
            flag: '🇺🇸',
            capital: 'Washington, D.C.',
            population: 331000000,
            area: 9834000,
            languages: ['English'],
            currency: 'US Dollar',
            continent: 'North America'
        },
        {
            code: 'FR',
            name: 'France',
            flag: '🇫🇷',
            capital: 'Paris',
            population: 67000000,
            area: 643801,
            languages: ['French'],
            currency: 'Euro',
            continent: 'Europe'
        },
        {
            code: 'JP',
            name: 'Japan',
            flag: '🇯🇵',
            capital: 'Tokyo',
            population: 125000000,
            area: 377975,
            languages: ['Japanese'],
            currency: 'Japanese Yen',
            continent: 'Asia'
        },
        {
            code: 'BR',
            name: 'Brazil',
            flag: '🇧🇷',
            capital: 'Brasília',
            population: 213000000,
            area: 8516000,
            languages: ['Portuguese'],
            currency: 'Brazilian Real',
            continent: 'South America'
        },
        {
            code: 'AU',
            name: 'Australia',
            flag: '🇦🇺',
            capital: 'Canberra',
            population: 25000000,
            area: 7692000,
            languages: ['English'],
            currency: 'Australian Dollar',
            continent: 'Oceania'
        },
        {
            code: 'DE',
            name: 'Germany',
            flag: '🇩🇪',
            capital: 'Berlin',
            population: 83000000,
            area: 357386,
            languages: ['German'],
            currency: 'Euro',
            continent: 'Europe'
        },
        {
            code: 'IN',
            name: 'India',
            flag: '🇮🇳',
            capital: 'New Delhi',
            population: 1380000000,
            area: 3287000,
            languages: ['Hindi', 'English'],
            currency: 'Indian Rupee',
            continent: 'Asia'
        },
        {
            code: 'CN',
            name: 'China',
            flag: '🇨🇳',
            capital: 'Beijing',
            population: 1440000000,
            area: 9597000,
            languages: ['Mandarin Chinese'],
            currency: 'Chinese Yuan',
            continent: 'Asia'
        },
        {
            code: 'GB',
            name: 'United Kingdom',
            flag: '🇬🇧',
            capital: 'London',
            population: 67000000,
            area: 242495,
            languages: ['English'],
            currency: 'British Pound',
            continent: 'Europe'
        },
        {
            code: 'IT',
            name: 'Italy',
            flag: '🇮🇹',
            capital: 'Rome',
            population: 60000000,
            area: 301340,
            languages: ['Italian'],
            currency: 'Euro',
            continent: 'Europe'
        },
        {
            code: 'ES',
            name: 'Spain',
            flag: '🇪🇸',
            capital: 'Madrid',
            population: 47000000,
            area: 505990,
            languages: ['Spanish'],
            currency: 'Euro',
            continent: 'Europe'
        },
        {
            code: 'CA',
            name: 'Canada',
            flag: '🇨🇦',
            capital: 'Ottawa',
            population: 38000000,
            area: 9985000,
            languages: ['English', 'French'],
            currency: 'Canadian Dollar',
            continent: 'North America'
        }
    ];

    findAll(): CountryDto[] {
        return this.countries.map(country => ({
            code: country.code,
            name: country.name,
            flag: country.flag
        }));
    }

    findByCode(code: string): CountryDto | undefined {
        return this.countries.find(country => country.code === code);
    }
}
