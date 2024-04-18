// stripe.service.ts
import { Injectable } from '@angular/core';
import { Stripe, loadStripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = this.loadStripe();
  }

  private loadStripe(): Promise<Stripe | null> {
    return loadStripe('pk_test_51OKda9H5eXnyJcWfb1dh0tGzXv2FclyLrDzPCqL5SGsyuDmZr2ljbfquR7kMZaRVONanewECDPXfPWswAiKQvuxl009QOEIECu')
      .then((stripe: Stripe | null) => {
        if (!stripe) {
          console.error('Stripe is not initialized.');
        }
        return stripe;
      })
      .catch((error: any) => {
        console.error('Error initializing Stripe:', error);
        return null;
      });
  }

  initializeStripe(): Observable<Stripe | null> {
    return new Observable<Stripe | null>((observer: Observer<Stripe | null>) => {
      this.stripePromise
        .then((stripe: Stripe | null) => {
          observer.next(stripe);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  handlePayment(amount: number): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.stripePromise
        .then((stripe: Stripe | null) => {
          if (!stripe) {
            console.error('Stripe is not initialized.');
            observer.error('Stripe is not initialized.');
            return;
          }

          const elements: StripeElements = stripe.elements();
          const cardElement: StripeCardElement = elements.create('card');

          // Mount the card element to a container
          cardElement.mount('#card-element');

          // Handle card validation or other UI-related tasks as needed

          // Perform the payment using the token or handle the payment on the server
          // For simplicity, I'm returning a hardcoded success value here.
          observer.next(true);
          observer.complete();
        })
        .catch((error: any) => {
          console.error('Error initializing Stripe:', error);
          observer.error('Error initializing Stripe.');
        });
    });
  }
}
