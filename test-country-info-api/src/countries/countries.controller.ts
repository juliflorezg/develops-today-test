import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('v1/countries')
export class CountriesController {

  constructor(private readonly countriesService: CountriesService) { }

  @Get()
  async getAll() {
    return this.countriesService.getAvailableCountries()
  }

}
