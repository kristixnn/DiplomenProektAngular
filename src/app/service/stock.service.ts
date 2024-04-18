import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  api = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=WLWT0DIVC9LZ2CYN';

  constructor(private http: HttpClient) { }

  getStockData() {
    return this.http.get(this.api);
  }
}
