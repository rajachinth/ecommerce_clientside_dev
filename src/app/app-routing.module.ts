import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadserviceService } from './sharedModule/services/preloadservice.service';

const routes: Routes = [{path: 'authentication', data: {preload: true}, loadChildren: () => import('./authenticationModule/authenticationmodule.module')
                                                                .then(m => m.AuthenticationmoduleModule)},
                    {path: 'order', data: {preload: true, animation: 'AnimationPathOne'}, loadChildren: () => import('./ordersModule/ordersmodule.module')
                                                                .then(m => m.OrdersmoduleModule)},
                    {path: 'product', data: {preload: true, animation: 'AnimationPathThree'}, loadChildren: () => import('./productsModule/productmodule.module')
                                                                .then(m => m.ProductmoduleModule)},
                    {path: 'shopping', data: {preload: true, animation: 'AnimationPathTwo'}, loadChildren: () => import('./shoppingModule/shoppingmodule.module')
                                                                .then(m => m.ShoppingmoduleModule)},
                    {path: 'routeRedirect', data: {preload: true}, loadChildren: () => import('./sharedModule/sharedmodule.module')
                                                                .then(m => m.SharedmoduleModule)},
                    {path: '', redirectTo: 'shopping', pathMatch: 'full', data: {animation: 'AnimationPathOne'}},
                    {path: '*', data: {preload: true}, loadChildren: () => import('./sharedModule/sharedmodule.module')
                                                                .then(m => m.SharedmoduleModule)}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadserviceService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
