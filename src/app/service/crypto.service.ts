// Import the necessary modules and services
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiKey = '38cbbcb0c98e6c9e40c462191699a04cbf824d6742f8b0994a9a12c23b5e0bf4'; // Replace with your actual API key
  private apiUrl = 'https://min-api.cryptocompare.com/data/';

  constructor(private http: HttpClient) {}

  getCryptoList(): Observable<string[]> {
    const url = `${this.apiUrl}all/coinlist?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        // Extract the symbols from the API response
        return Object.keys(data.Data).map((key) => data.Data[key].Symbol);
      })
    );
  }
}
