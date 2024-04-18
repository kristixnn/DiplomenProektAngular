import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { ProfileinfoComponent } from './profileinfo/profileinfo.component';
import { AddmoneyComponent } from './addmoney/addmoney.component';
import { CardformComponent } from './cardform/cardform.component';
import { GpayComponent } from './gpay/gpay.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { CurrencyconverterComponent } from './currencyconverter/currencyconverter.component';
import { StockpageComponent } from './stockpage/stockpage.component';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { environmentProd } from 'src/environments/environment.prod';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxStripeModule } from 'ngx-stripe';
import { MoneytransferComponent } from './moneytransfer/moneytransfer.component';
import { ExpensetrackerComponent } from './expensetracker/expensetracker.component';
import { TradeComponent } from './trade/trade.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UpdatepopupComponent,
    ProfileinfoComponent,
    AddmoneyComponent,
    CardformComponent,
    GpayComponent,
    CurrencyconverterComponent,
    StockpageComponent,
    MoneytransferComponent,
    ExpensetrackerComponent,
    TradeComponent,
    ThemeToggleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    GooglePayButtonModule,
    TranslateModule.forRoot({loader:{provide:TranslateLoader,useFactory:HttpLoaderFactory,deps:[HttpClient]}}),
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    NgxStripeModule.forRoot('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'),
    NgxChartsModule,
    AngularFireModule.initializeApp(environmentProd.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environmentProd.firebaseConfig)),     
    provideAuth(() => getAuth())
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
