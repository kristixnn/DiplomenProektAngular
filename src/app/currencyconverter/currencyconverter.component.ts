import { Component, OnInit } from '@angular/core';
import { CurrencyexchangeService } from '../service/currencyexchange.service';

@Component({
  selector: 'app-currencyconverter',
  templateUrl: './currencyconverter.component.html',
  styleUrls: ['./currencyconverter.component.css']
})
export class CurrencyconverterComponent implements OnInit {
  private _amount: number = 0;
  private _baseCurrency: string = 'BGN';
  private _targetCurrency: string = 'EUR';
  exchangeRates: any;
  result: number = 0;
  targetCurrencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD', 'INR', 'BRL', 'ZAR', 'SGD', 'HKD', 'KRW', 'MXN', 'NOK', 'RUB', 'TRY'];

  constructor(private currencyService: CurrencyexchangeService) {}

  ngOnInit(): void {
    this.getExchangeRates();
  }
  get amount(): number {
    return this._amount;
  }
  set amount(value: number) {
    this._amount = value;
    this.convert();
  }
  get baseCurrency(): string {
    return this._baseCurrency;
  }
  set baseCurrency(value: string) {
    this._baseCurrency = value;
    this.getExchangeRates();
  }
  get targetCurrency(): string {
    return this._targetCurrency;
  }
  set targetCurrency(value: string) {
    this._targetCurrency = value;
    this.convert();
  }

  convert(): void {
    const rate = this.exchangeRates.rates[this.targetCurrency];
    this.result = this.amount * rate;
  }

  getExchangeRates(): void {
    this.currencyService
      .getExchangeRates(this.baseCurrency)
      .subscribe((data) => {
        this.exchangeRates = data;
        this.convert(); // automatically convert when exchange rates are fetched
      });
  }
}
