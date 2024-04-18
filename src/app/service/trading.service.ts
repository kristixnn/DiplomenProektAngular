import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the service a singleton and available throughout the app
})
export class TradingService{
    private apiUrl = 'https://finnhub.io/api/v1';

  constructor(private http: HttpClient) {}

  // Function to make the API request with headers
  getCandleData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer cncum81r01qr85dt0i2gcncum81r01qr85dt0i30'
    });

    // Make the request with headers
    return this.http.get(`${this.apiUrl}/stock/candle?symbol=nvidia-tokenized-stock-defichain&resolution=D&count=10`, { headers });
  }
}