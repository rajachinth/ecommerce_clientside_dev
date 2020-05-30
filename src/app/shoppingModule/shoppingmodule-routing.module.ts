import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { AuthguardService } from '../sharedModule/services/authguard.service';


const routes: Routes = [{path:'',children:[
  {path:'shoppingList',component:ShoppingcartComponent,pathMatch:'full'},
  {path:'checkout',component:CheckoutComponent},
  {path:'ordersummary',component:OrdersummaryComponent,canActivate:[AuthguardService]},]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingmoduleRoutingModule { }
