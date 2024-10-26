import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {

  constructor(private readonly httpService: HttpService) { }

  async getAvailableCountries() {
    const res = await lastValueFrom(
      this.httpService.get('https://date.nager.at/api/v3/AvailableCountries')
    )

    return res.data
  }
}
