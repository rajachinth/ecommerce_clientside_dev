import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyorderFormComponent } from './myorder-form/myorder-form.component';
import { MyorderComponent } from './myorder/myorder.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AuthguardService } from '../sharedModule/services/authguard.service';
import { AdminguardService } from '../sharedModule/services/adminguard.service';


const routes: Routes = [{path: '', children: [
{path: 'revieworder/:orderID', component: MyorderFormComponent},
{path: 'myorder/:username', component: MyorderComponent,
canActivate: [AuthguardService]},
{path: 'adminorder/:username', component: AdminOrderComponent,
canActivate: [AuthguardService, AdminguardService]},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersmoduleRoutingModule { }
