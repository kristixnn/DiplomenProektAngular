import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addmoney',
  templateUrl: './addmoney.component.html',
  styleUrls: ['./addmoney.component.css']
})
export class AddmoneyComponent{
  selectedPaymentMethod:any;
  amount:number | undefined;
  paymentMethodTip=false;
  constructor(private router: Router, private toastr:ToastrService) { }
  
  redirectToCardForm(){
    this.router.navigate(['/cardform'],{queryParams:{amount:this.amount}});
  }
  redirectToGooglePay() {
    this.router.navigate(['/gpay'],{queryParams:{amount:this.amount}});
  }
  redirectToSelectedPage(){
    if(this.selectedPaymentMethod==='CreditOrDebitCard'){
      this.redirectToCardForm();
    }
    else if(this.selectedPaymentMethod==='GooglePay'){
      this.redirectToGooglePay();
    }
  }
  onSubmit(){
    this.redirectToSelectedPage();
  }
  showPaymentMethodTip() {
    this.paymentMethodTip=true;
    this.toastr.info(
      'The payment methods do NOT make real transcations and do NOT charge real money.'
    );
    this.toastr.info(
      'Методите за плащане НЕ извършват реални транзакции и НЕ начисляват реални пари.'
    );
  }

}
