import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersuccessComponent } from './commonComponents/ordersuccess/ordersuccess.component';
import { AccessdeniedComponent } from './commonComponents/accessdenied/accessdenied.component';
import { InvalidrouteComponent } from './commonComponents/invalidroute/invalidroute.component';


const routes: Routes = [
  {path: '', children: [{path: 'accessdenied', component: AccessdeniedComponent},
  {path: 'ordersuccess', component: OrdersuccessComponent}]},
  {path: '**', component: InvalidrouteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedmoduleRoutingModule { }
