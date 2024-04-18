import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-moneytransfer',
  templateUrl: './moneytransfer.component.html',
  styleUrls: ['./moneytransfer.component.css']
})
export class MoneytransferComponent implements AfterViewInit{
  
  constructor(private db: AngularFireDatabase, private toastr: ToastrService) { }

  fromAccount = '';
  toAccount = '';
  amount = 0;
  transactions:any[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getBalance(userId: string): void {
    this.db.object(`user/${userId}/balance`).valueChanges().subscribe({
      next: (balance: any) => console.log('User balance:', balance),
      error: (error: any) => console.log('Error occurred while getting user balance', error)
    });
  }
  ngAfterViewInit(): void {
    const loggedInUserKey = sessionStorage.getItem('username');
    this.getUserTransactions(loggedInUserKey!);
  }
  onSubmit(): void {
    // Get the logged-in user's username from the sessionStorage
    const loggedInUserKey = sessionStorage.getItem('username');
  
    // Check if the logged-in user is the one who is sending the money
    if (loggedInUserKey !== this.fromAccount) {
      this.toastr.error('The logged-in user does not match the from account');
      return;
    }
  
    // Fetch the 'from' account
    this.db.object(`user/${this.fromAccount}`).snapshotChanges().pipe(take(1)).subscribe({
      next: (snapshot: any) => {
        const fromUser = snapshot.payload.val();
        
        // Check if the 'from' account exists
        if (!fromUser) {
          this.toastr.error('The from account does not exist');
          return;
        }
  
        // Check if the 'from' account has enough balance
        if (fromUser.balance < this.amount) {
          this.toastr.warning('Insufficient balance');
          return;
        }
  
        // Fetch the 'to' account
        this.db.object(`user/${this.toAccount}`).snapshotChanges().pipe(take(1)).subscribe({
          next: (snapshot: any) => {
            const toUser = snapshot.payload.val();
            // Check if the 'to' account exists
            if (!toUser) {
              this.toastr.warning('The to account does not exist');
              return;
            }
  
            // Perform the transfer
            const data = {
              fromAccount: this.fromAccount,
              toAccount: this.toAccount,
              amount: this.amount
            };
  
            this.db.list('transactions').push(data).then(() => {
              this.toastr.success('Money transferred successfully');
  
              // Update the 'to' account balance
              toUser.balance += this.amount;
              this.db.object(`user/${this.toAccount}`).update({ balance: toUser.balance })
  
              // Update the 'from' account balance
              fromUser.balance -= this.amount;
              this.db.object(`user/${this.fromAccount}`).update({ balance: fromUser.balance })

              // Fetch the transactions of the logged-in user
            
              
            }, (error: any) => {
              
            });
          },
          error: (error: any) => console.log('Error occurred while fetching the to account', error)
        });
      },
      error: (error: any) => console.log('Error occurred while fetching the from account', error)
    });
  }

  
  getUserTransactions(userId: string): void {
    this.db.list(`transactions`, ref => ref.orderByChild('fromAccount').equalTo(userId)).valueChanges().subscribe({
      next: (transactions: any) => {
        this.transactions = transactions;
        this.dataSource = new MatTableDataSource(this.transactions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => console.log('Error occurred while getting user transactions', error)
    });
  }

  
}
