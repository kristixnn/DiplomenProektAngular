import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalanceService } from '../service/balance.service';
import { AuthService } from '../service/auth.service';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-gpay',
 
  templateUrl: './gpay.component.html',
  styleUrl: './gpay.component.css'
})
export class GpayComponent implements OnInit {
  amount: number=0;

  constructor(private route: ActivatedRoute,private balanceService:BalanceService, private authService:AuthService,private http:HttpClient,private toastr:ToastrService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.amount = +params['amount'] || 0;
    });
  }
  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: this.amount.toFixed(2),
      currencyCode: 'BGN',
      countryCode: 'BG'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (event: Event): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
    this.balanceService.setBalance(this.amount);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
  
    // Call the updateUserBalance method from BalanceService
    this.balanceService.updateUserBalanceWithGpay(this.amount).subscribe({
      next: () => {
        console.log('Balance updated successfully!');
        this.toastr.success('Balance updated successfully')
      },
      error: (error) => {
        console.error('Error updating user balance:', error);
        this.toastr.warning('Error updating user balance')
      }
    });
  
    return {
      transactionState: 'SUCCESS'
    };
  }
  
  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }
}
