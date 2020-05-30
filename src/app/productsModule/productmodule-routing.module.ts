import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../sharedModule/services/authguard.service';
import { AdminguardService } from '../sharedModule/services/adminguard.service';
import { ProductformComponent } from './productlistform/productform.component';
import { AdminProductComponent } from './admin-product/admin-product.component';


const routes: Routes = [
  {path:'',children:[
  {path:'adminproduct/addproduct/:username',component:ProductformComponent,
  canActivate:[AuthguardService,AdminguardService]},
  {path:'adminproduct/editproduct/:username/:productID',component:ProductformComponent,
  canActivate:[AuthguardService,AdminguardService]},
  {path:'adminproduct/:username',component:AdminProductComponent,
  canActivate:[AuthguardService,AdminguardService]},]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductmoduleRoutingModule { }
