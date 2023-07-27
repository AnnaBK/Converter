import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take } from 'rxjs';
import { RateAPI } from '../rates/RateAPI';
import { Rate } from '../rates/Rate';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getRate(): Observable<RateAPI[]> {
    return this.httpClient
        .get<RateAPI[]>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
}
}