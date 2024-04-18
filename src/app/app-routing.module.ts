import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ProfileinfoComponent } from './profileinfo/profileinfo.component';
import { AddmoneyComponent } from './addmoney/addmoney.component';
import { CardformComponent } from './cardform/cardform.component';
import { GpayComponent } from './gpay/gpay.component';
import { CurrencyconverterComponent } from './currencyconverter/currencyconverter.component';
import { StockpageComponent } from './stockpage/stockpage.component';

import { MoneytransferComponent } from './moneytransfer/moneytransfer.component';
import { ExpensetrackerComponent } from './expensetracker/expensetracker.component';
import { TradeComponent } from './trade/trade.component';
const routes: Routes = [
 {component:LoginComponent,path:'login'},
 {component:RegisterComponent,path:'register'},
 {component:HomeComponent,path:'',canActivate:[AuthGuard]},
 {component:UserComponent,path:'user',canActivate:[AuthGuard]},
 {component:ProfileinfoComponent,path:'profileinfo',canActivate:[AuthGuard]},
 {component:AddmoneyComponent,path:'addmoney',canActivate:[AuthGuard]},
 {component:CardformComponent,path:'cardform',canActivate:[AuthGuard]},
 {component:GpayComponent,path:'gpay',canActivate:[AuthGuard]},
 {component:CurrencyconverterComponent,path:'currencyconverter',canActivate:[AuthGuard]},
 {component:StockpageComponent,path:'stockpage',canActivate:[AuthGuard]},

 {component:MoneytransferComponent,path:'moneytransfer',canActivate:[AuthGuard]},
 {component:ExpensetrackerComponent,path:'expensetracker',canActivate:[AuthGuard]},
 {component:TradeComponent,path:'trade',canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }