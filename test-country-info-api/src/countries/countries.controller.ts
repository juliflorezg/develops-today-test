import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('v1/countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getAll() {
    return this.countriesService.getAvailableCountries();
  }

  @Get('country-info/:code')
  async getCountryInfo(@Param('code') countryCode: string) {
    return this.countriesService.getCountryInfo(countryCode);
  }
}
