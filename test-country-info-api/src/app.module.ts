import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from './countries/countries.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    HttpModule,
  ],
  providers: [CountriesService],
})
export class AppModule { }
