export interface CountryDto {
    code: string;
    name: string;
    flag: string;
    capital?: string;
    population?: number;
    area?: number;
    languages?: string[];
    currency?: string;
    continent?: string;
}