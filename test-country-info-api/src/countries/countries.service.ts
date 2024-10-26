import { HttpService } from '@nestjs/axios';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
}

@Injectable()
export class CountriesService {
  private readonly nagerApiBaseUrl: string;
  private readonly countriesNowApiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.nagerApiBaseUrl = this.configService.get<string>('NAGER_API_BASE_URL');
    this.countriesNowApiBaseUrl = this.configService.get<string>('COUNTRIES_NOW_API_BASE_URL');
  }

  async getAvailableCountries() {
    const res = await lastValueFrom(
      this.httpService.get(`${this.nagerApiBaseUrl}/AvailableCountries`),
    );

    return res.data;
  }

  async getCountryInfo(code: string) {
    let iso2Code: string;
    let countryName: string;

    let flagData;
    const countryInfoData: AxiosResponse<CountryInfo> = await lastValueFrom(
      this.httpService.get(`${this.nagerApiBaseUrl}/CountryInfo/${code}`),
    );

    countryName = countryInfoData.data.commonName;

    try {
      const populationData = await lastValueFrom(
        this.httpService.post(
          `${this.countriesNowApiBaseUrl}/countries/population`,
          {
            country: countryName,
          },
        ),
      );

      const isoCodesRes = await lastValueFrom(
        this.httpService.post(
          `${this.countriesNowApiBaseUrl}/countries/iso`,
          {
            country: countryName,
          },
        ),
      );
      iso2Code =
        isoCodesRes.status == HttpStatus.OK
          ? isoCodesRes.data.data.Iso2
          : 'not-found';

      if (iso2Code !== 'not-found') {
        flagData = await lastValueFrom(
          this.httpService.post(
            `${this.countriesNowApiBaseUrl}/countries/flag/images`,
            {
              iso2: iso2Code,
            },
          ),
        );
      } else {
        flagData = 'not-found';
      }

      return {
        countryName,
        borders: countryInfoData.data.borders,
        population: populationData.data.data.populationCounts,
        flagURL: flagData !== 'not-found' ? flagData.data.data.flag : null,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch country information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
