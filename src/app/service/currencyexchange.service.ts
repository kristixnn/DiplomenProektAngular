import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyexchangeService {
  private apiKey = 'd3eed8bfb1cf408582008a7c0e051e07';
  private apiUrl = 'https://open.er-api.com/v6/latest/';

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCurrency: string): Observable<any> {
    const url = `${this.apiUrl}${baseCurrency}?apikey=${this.apiKey}`;
    return this.http.get(url);
  }

}
