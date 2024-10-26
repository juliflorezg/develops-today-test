import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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

  constructor(private readonly httpService: HttpService) { }

  async getAvailableCountries() {
    const res = await lastValueFrom(
      this.httpService.get('https://date.nager.at/api/v3/AvailableCountries')
    )

    return res.data

  }
  async getCountryInfo(code: string) {
    let iso2Code: string
    let countryName: string
    const countryInfoData: AxiosResponse<CountryInfo> = await lastValueFrom(
      this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${code}`)
    )

    countryName = countryInfoData.data.commonName

    const populationData = await lastValueFrom(
      this.httpService.post(`https://countriesnow.space/api/v0.1/countries/population`, {
        country: countryName
      })
    )
    const isoCodesRes = await lastValueFrom(
      this.httpService.post(`https://countriesnow.space/api/v0.1/countries/iso
`, {
        country: countryName
      })
    )
    iso2Code = isoCodesRes.data.data.Iso2
    console.log({ iso2Code })

    const flagData = await lastValueFrom(
      this.httpService.post(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
        iso2: iso2Code
      })
    )


    return {
      countryName,
      borders: countryInfoData.data.borders,
      population: populationData.data.data.populationCounts,
      flagURL: flagData.data.data.flag
    }
  }
}
