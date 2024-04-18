import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceService } from '../service/balance.service';
import { AuthService } from '../service/auth.service';
import { FormBuilder,Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  balance: any = 0;
  user: any;
  id: any;
 
  constructor(private http:HttpClient,private router: Router, private balanceService: BalanceService, private authService: AuthService,private fb: FormBuilder,private db: AngularFireDatabase) {   
  }
  
  ngOnInit() {
    this.fetchUserAndBalance();
  }

  redirectToAddMoneyPage() {
    this.router.navigate(['/addmoney']);
  }

  redirectToCurrencyConverter() {
    this.router.navigate(['/currencyconverter']);
  }

  redirectToStockPage() {
    this.router.navigate(['/stockpage']);
  }

  redirectToMoneyTransferPage(){
    this.router.navigate(['/moneytransfer']);
  }
  
  redirectToExpenseTracker(){
    this.router.navigate(['/expensetracker']);
  }
  redirectToTradePage(){
    this.router.navigate(['/trade']);
  }
  private fetchUserAndBalance() {
    if (this.authService.isloggedin()){
      this.authService.getUserIdForHome().subscribe(id => {
       this.id=id;
        this.balanceService.getUserBalance().subscribe(balance => {
        this.balance = balance;
      });
    });
    }
    
  }  
}
