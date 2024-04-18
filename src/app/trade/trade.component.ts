import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CryptoService } from '../service/crypto.service';
import { map } from 'rxjs';
declare const TradingView: any;

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  tradeForm!: FormGroup;
  resultMessage!: string;
  userBalance!: number;
  cryptoList: any[] = []; // Declare cryptoList property

  constructor(
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.initTradeForm();
    this.getInitialUserBalance();
    this.fetchCryptoList(); // Call method to fetch cryptoList
  }

  private initTradeForm() {
    this.tradeForm = this.fb.group({
      selectedCrypto: [''],
      amountToTrade: [0]
    });
  }

  private getInitialUserBalance() {
    const username = this.authService.getUsersIdForExpenses()!;
  
    this.db.object(`user/${username}/balance`).valueChanges().pipe(
      map(balance => Number(balance))
    ).subscribe({
      next: (balance: number) => {
        this.userBalance = balance;
      },
      error: (error: any) => {
        console.error('Error fetching user balance:', error);
      }
    });
  } 

  private updateUserBalance(newBalance: number) {
    const username = this.authService.getUsersIdForExpenses()!;

    this.db.object(`user/${username}`).update({ balance: newBalance }).then(() => {
      console.log('User balance updated successfully on the server.');
    }, (error: any) => {
      console.error('Error updating user balance:', error);
    });
  }

  private fetchCryptoList() {
    // Fetch the list of cryptocurrencies
    this.cryptoService.getCryptoList().subscribe({
      next: (cryptoList) => {
        this.cryptoList = cryptoList;
      },
      error: (error) => {
        console.error('Error fetching crypto list:', error);
      }
    });
  }

  trade() {
    const apiKey = 'cncum81r01qr85dt0i2gcncum81r01qr85dt0i30';
    const symbol = this.tradeForm.value.selectedCrypto;
    const tradeAmount = this.tradeForm.value.amountToTrade;
  
    if (tradeAmount > this.userBalance) {
      this.resultMessage = 'Insufficient funds. Please enter a valid trade amount.';
      return;
    }
  
    const data = {
      apiKey,
      symbol,
      tradeAmount
    };
  
    this.db.list('trades').push(data).then(() => {
      console.log('Money transferred successfully');
      this.toastr.success('Successfully entered the trade');
  
      this.userBalance -= tradeAmount;
      this.updateUserBalance(this.userBalance);
  
      this.resultMessage = `Successfully entered ${symbol} with ${tradeAmount} `;
    }, (error: any) => {
      console.error('Error:', error);
      this.resultMessage = 'Error occurred during the trade. Please try again.';
    });
  }
  
  sell() {
    const apiKey = 'cncum81r01qr85dt0i2gcncum81r01qr85dt0i30';
    const symbol = this.tradeForm.value.selectedCrypto;
    const tradeAmount = this.tradeForm.value.amountToTrade;
  
    if (tradeAmount > this.userBalance) {
      this.resultMessage = 'Insufficient funds. Please enter a valid trade amount.';
      return;
    }
  
    const data = {
      apiKey,
      symbol,
      tradeAmount
    };
  
    this.db.list('trades').push(data).then(() => {
      console.log('Money transferred successfully');
      this.toastr.success('Successfully exited the trade');
  
      this.userBalance += tradeAmount;
      this.updateUserBalance(this.userBalance);
  
      this.resultMessage = `Successfully exited ${symbol}`;
    }, (error: any) => {
      console.error('Error:', error);
      this.resultMessage = 'Error occurred during the trade. Please try again.';
    });
  }
  

  ngAfterViewInit() {
   
  new TradingView.widget({
    container_id: 'technical-analysis',
    autosize: true,
   
    interval: 'D',
    timezone: 'exchange',
    theme: 'Dark',
    style: '1',
    toolbar_bg: '#f1f3f6',
    withdateranges: true,
    hide_side_toolbar: false,
    allow_symbol_change: true,
    save_image: false,
    hideideas: true,
    studies: ['MASimple@tv-basicstudies'],
    show_popup_button: true,
    popup_width: '1000',
    popup_height: '650'
  });
}
  
  
}
