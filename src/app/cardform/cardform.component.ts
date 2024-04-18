// cardform.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../service/stripe.service';
import { BalanceService } from '../service/balance.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.css']
})
export class CardformComponent implements OnInit {

  amount: number=0;
  paymentForm!: FormGroup;
  paymentInProgress: boolean = false;

  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private balanceService: BalanceService,
    private toastr:ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.amount = +params['amount'] || 0;
    });
    // Initialize Stripe and subscribe to the observable to get the initialized Stripe instance or handle errors
    this.stripeService.initializeStripe().subscribe({
      next: (stripe) => {
        // Handle the initialized Stripe instance
        if (stripe) {
          // Your logic with the initialized Stripe instance
          console.log('Stripe initialized successfully');
          var elements = stripe.elements();
        // Custom styling can be passed to options when creating an Element.
        var style = {
          base: {
            // Add your base input styles here. For example:
            fontSize: '16px',
            color: '#32325d',
          },
        };
        // Create an instance of the card Element
        var card = elements.create('card', {style: style});

        // Add an instance of the card Element into the `card-element` <div>
        card.mount('#card-element');
        } else {
          // Handle the case where initialization failed
          console.error('Error initializing Stripe.');
        }
      },
      error: (error) => {
        console.error('Error initializing Stripe:', error);
        // Handle initialization error
      }
    });
  }

  pay(amount: number) {
    this.paymentInProgress = true;

    this.stripeService.handlePayment(amount).subscribe({
      next: (paymentSuccess: boolean) => {
        this.paymentInProgress = false;
        
        if (paymentSuccess) {
          console.log('Payment success!');
          this.toastr.success('Payment success!');
          this.balanceService.updateUserBalance(amount).subscribe({
            next: () => {
              console.log('Balance updated successfully!');
            },
            error: (error) => {
              console.error('Error updating user balance:', error);
            }
          });
        } else {
          console.error('Payment failed.');
          this.toastr.warning('Payment failed')
        }
      },
      error: (error) => {
        this.paymentInProgress = false;
        console.error('Error processing payment:', error);
      }
    });
  }
}
