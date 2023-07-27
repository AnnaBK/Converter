import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency-service';
import { Rate } from './rates/Rate';
import { Observable } from 'rxjs';
import { RateAPI } from './rates/RateAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CurrencyService
  ],
})
export class AppComponent implements OnInit {
  title = 'Currency';
  // usd = '1.0';
  // eur = '1.5';
  // uah = '0.0';
  inputFirst!: number;
  inputSecond!: number;
  currencyFirst: string = "UAH";
  currencySecond: string = "USD";
  rates: Rate[] = [];
  usdRate: number = 0;
  eurRate: number = 0;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getRate().subscribe((data: RateAPI[]) => {
      data.forEach(rateAPI => {
        let rate: Rate = {
          ccy: rateAPI.ccy,
          base_ccy: rateAPI.base_ccy,
          buy: Number(rateAPI.buy),
          sale: Number(rateAPI.sale)
        };
        switch (rate.ccy) {
          case 'USD':
            this.usdRate = rate.sale;
          break;
          case 'EUR':
            this.eurRate = rate.sale;
        }
        this.rates.push(rate);
      })
    })
  }

  public inputValidator(event: any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

   private map(currency: string, count: number, newCurrency: string)  {
    console.log(currency+count+newCurrency);
      switch (currency + newCurrency) {
        case 'UAHUSD':
          return count / this.usdRate;
        case "UAHEUR":
          return count / this.eurRate;
          case 'USDUAH':
            return count * this.usdRate;
          case "EURUAH":
            return count * this.eurRate;
          case 'USDEUR': 
            return count * this.usdRate / this.eurRate;
          case 'EURUSD':
            return count * this.eurRate / this.usdRate;
          default: 
            return count;
      }
   }

  inputFirstChange(inputFirst: number): void {  
    this.inputFirst = inputFirst;
    this.inputSecond = Number(this.map(this.currencyFirst, inputFirst, this.currencySecond).toFixed(2));
  }

  inputSecondChange(inputSecond: number): void {  
    this.inputSecond = inputSecond;
    this.inputFirst = Number(this.map(this.currencySecond, inputSecond, this.currencyFirst).toFixed(2));
  }

  currencyFirstChange(currencyFirst: string): void {  
    this.currencyFirst = currencyFirst;
    this.inputSecond = Number(this.map(currencyFirst, this.inputFirst, this.currencySecond).toFixed(2));
  }

  currencySecondChange(currencySecond: string): void {  
    this.currencySecond = currencySecond;
    this.inputFirst = Number(this.map(currencySecond, this.inputSecond, this.currencyFirst).toFixed(2));
  }
}
