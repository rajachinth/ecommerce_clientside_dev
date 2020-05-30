import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductmoduleRoutingModule } from './productmodule-routing.module';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { ProductformComponent } from './productlistform/productform.component';
import { SharedmoduleModule } from '../sharedModule/sharedmodule.module';

@NgModule({
  declarations: [
    ProductformComponent,
    AdminProductComponent,
  ],
  imports: [
    CommonModule,
    ProductmoduleRoutingModule,
    SharedmoduleModule
  ]
})
export class ProductmoduleModule { }
