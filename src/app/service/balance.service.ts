import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import {from} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balance: number | null = null;

  constructor( private db: AngularFireDatabase) {}

  setBalance(amount: number) {
    this.balance = amount;
  }

  getUserBalance(): Observable<any> {
    const userId = sessionStorage.getItem('username');
    return this.db.object(`user/${userId}/balance`).valueChanges();
  }
  
  updateUserBalance(paymentAmount: number): Observable<any> {
    const userId = sessionStorage.getItem('username');
    // First, get the current balance
    return this.db.object(`user/${userId}/balance`).snapshotChanges().pipe(
      take(1),
      switchMap((snapshot: any) => {
        // Add the payment amount to the current balance
        const balance = snapshot.payload.val();
        const newBalance = balance + paymentAmount;
        // Update the balance
        return this.db.object(`user/${userId}`).update({ balance: newBalance });
      })
    );
  }

  updateUserBalanceWithGpay(paymentAmount: number): Observable<any> {
    const userId = sessionStorage.getItem('username');
    // First, get the current balance
    return this.db.object(`user/${userId}/balance`).snapshotChanges().pipe(
      take(1),
      switchMap((snapshot: any) => {
        // Add the payment amount to the current balance
        const balance = snapshot.payload.val();
        const newBalance = balance + paymentAmount;
        // Update the balance
        return this.db.object(`user/${userId}`).update({ balance: newBalance });
      })
    );
  }
  
  updateTradingBalance(userId: string, amount: number): Observable<any> {
    return from(this.db.object(`user/${userId}`).update({ balance: amount }));
  }

  getUserBalanceByUsername(username: string): Observable<number> {
    return this.db.list('user', ref => ref.orderByChild('username').equalTo(username)).valueChanges().pipe(
      switchMap((users: any[]) => {
        if (users.length > 0) {
          return of(users[0].balance);
        } else {
          return of(0);
        }
      })
    );
  }

}
