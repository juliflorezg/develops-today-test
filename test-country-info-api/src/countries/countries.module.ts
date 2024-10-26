import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from './countries.service';

@Module({
  imports: [HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
