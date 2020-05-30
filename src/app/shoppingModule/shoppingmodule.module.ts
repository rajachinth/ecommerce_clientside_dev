import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingmoduleRoutingModule } from './shoppingmodule-routing.module';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { SharedmoduleModule } from '../sharedModule/sharedmodule.module';


@NgModule({
  declarations: [
    ShoppingcartComponent,
    CheckoutComponent,
    OrdersummaryComponent,
  ],
  imports: [
    CommonModule,
    ShoppingmoduleRoutingModule,
    SharedmoduleModule
  ]
})
export class ShoppingmoduleModule { }
