import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersmoduleRoutingModule } from './ordersmodule-routing.module';
import { MyorderComponent } from './myorder/myorder.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { MyorderFormComponent } from './myorder-form/myorder-form.component';
import { SharedmoduleModule } from '../sharedModule/sharedmodule.module';


@NgModule({
  declarations: [
    MyorderComponent,
    AdminOrderComponent,
    MyorderFormComponent,

  ],
  imports: [
    CommonModule,
    OrdersmoduleRoutingModule,
    SharedmoduleModule
  ]
})
export class OrdersmoduleModule { }
