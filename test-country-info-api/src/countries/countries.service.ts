import { HttpService } from '@nestjs/axios';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
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

    let flagData
    const countryInfoData: AxiosResponse<CountryInfo> = await lastValueFrom(
      this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${code}`)
    )

    countryName = countryInfoData.data.commonName
    console.log({ countryName })

    try {



      const populationData = await lastValueFrom(
        this.httpService.post(`https://countriesnow.space/api/v0.1/countries/population`, {
          country: countryName
        })
      )

      console.log({ populationData: populationData.data })

      const isoCodesRes = await lastValueFrom(
        this.httpService.post(`https://countriesnow.space/api/v0.1/countries/iso`, {
          country: countryName
        })
      )
      iso2Code = isoCodesRes.status == HttpStatus.OK ? isoCodesRes.data.data.Iso2 : 'not-found'
      console.log({ iso2Code })

      if (iso2Code !== 'not-found') {


        flagData = await lastValueFrom(
          this.httpService.post(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
            iso2: iso2Code
          })
        )
      } else {
        flagData = 'not-found'
      }


      return {
        countryName,
        borders: countryInfoData.data.borders,
        population: populationData.data.data.populationCounts,
        flagURL: flagData !== 'not-found' ? flagData.data.data.flag : null
      }

    } catch (error) {
      console.log(error)
      throw new HttpException("Failed to fetch country exception", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
