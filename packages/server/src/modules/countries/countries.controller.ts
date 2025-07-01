import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto/country.dto';

@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) { }

    @Get()
    getAllCountries(): CountryDto[] {
        return this.countriesService.findAll();
    }

    @Get(':code')
    getCountryByCode(@Param('code') code: string): CountryDto {
        const country = this.countriesService.findByCode(code);
        if (!country) {
            throw new Error(`Country with code ${code} not found`);
        }
        return country;
    }
}