import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ExpenseService } from '../service/expense.service';
import { map } from 'rxjs/operators';
declare const TradingView: any;

@Component({
  selector: 'app-expensetracker',
  templateUrl: './expensetracker.component.html',
  styleUrls: ['./expensetracker.component.css']
})
export class ExpensetrackerComponent implements OnInit {
  expenses: any[] = [];
  filteredExpenses: any[] = [];
  filterDate: string = '';
  newExpense: any = { description: '', amount: 0, date: '' };
  editingExpense: any = null; // Track the selected expense for editing
  editMode: boolean = false; // Flag to toggle editing mode
  public authService: AuthService;
  constructor(private expenseService: ExpenseService, private _authService:AuthService, private toastr:ToastrService) {
    this.authService=_authService;
  }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
      this.applyDateFilter();
    });
  }

  addExpense() {
    if (!this.newExpense.description || !this.newExpense.amount ){
      this.toastr.warning('Description or amount is empty.')
      return;
    }
    else{
      this.expenseService.addExpense(this.newExpense).then(() => {
      this.loadExpenses();
    });
    }
    
  }

  editExpense(expense: any) {
    // Toggle edit mode and set the selected expense
    this.editMode = true;
    this.editingExpense = { ...expense };
  }

  saveEdit() {
    // Save the changes made during editing
    const userId = this.authService.getUsersIdForExpenses();
  
    if (userId) {
      this.expenseService.updateExpense(userId, this.editingExpense).then(() => {
        // Reset editing variables
        this.editingExpense = null;
        this.editMode = false;
  
        // Reload expenses
        this.loadExpenses();
      });
    } else {
      console.error('User ID not available. Unable to update expense.');
    }
  }
  
  cancelEdit() {
    // Cancel the editing mode
    this.editingExpense = null;
    this.editMode = false;
  }

  deleteExpense(expenseId: any) {
    this.expenseService.deleteExpense(expenseId).then(() => {
      this.loadExpenses();
    });
  }

  applyDateFilter() {
    if (this.filterDate) {
      this.filteredExpenses = this.expenses.filter(
        (expense) => expense.date === this.filterDate
      );
    } else {
      this.filteredExpenses = this.expenses;
    }
  }

  calculateTotalExpenses(): number {
    return this.filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  }

  calculateAverageExpense(): number {
    const totalExpenses = this.calculateTotalExpenses();
    const numberOfExpenses = this.filteredExpenses.length;
    return numberOfExpenses > 0 ? totalExpenses / numberOfExpenses : 0;
  }

  
}
