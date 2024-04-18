import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) {}

  getExpenses(): Observable<any[]> {
    const userId = this.authService.getUsersIdForExpenses(); // Assuming this returns the user ID

    if (userId) {
      // Fetch expenses only for the logged-in user
      return this.db.list(`expenses/${userId}`).snapshotChanges().pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() as object })))
      );
    } else {
      // Handle the case where the user ID is not available (e.g., not logged in)
      return new Observable<any[]>(observer => {
        observer.next([]); // Return an empty array if not logged in
        observer.complete();
      });
    }
  }

  addExpense(expense: any): Promise<any> {
    const userId = this.authService.getUsersIdForExpenses();
  
    if (userId) {
      // Associate the user's ID with the new expense
      expense.userId = userId;
  
      return new Promise((resolve, reject) => {
        this.db.list(`expenses/${userId}`).push(expense)
          .then(result => resolve(result), error => reject(error));
      });
    } else {
      console.error('User ID not available. Unable to add expense.');
      return Promise.reject('User ID not available. Unable to add expense.');
    }
  }
  

  deleteExpense(expenseId: any): Promise<any> {
    const userId = this.authService.getUsersIdForExpenses();

    if (userId) {
      return this.db.object(`expenses/${userId}/${expenseId.key}`).remove();
    } else {
      console.error('User ID not available. Unable to delete expense.');
      return Promise.reject('User ID not available. Unable to delete expense.');
    }
  }

  updateExpense(userId: string, expense: any): Promise<any> {
    return this.db.object(`expenses/${userId}/${expense.key}`).update(expense);
  }
  
}
