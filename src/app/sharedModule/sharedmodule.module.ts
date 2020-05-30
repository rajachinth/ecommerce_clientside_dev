import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedmoduleRoutingModule } from './sharedmodule-routing.module';
import { OrdersuccessComponent } from './commonComponents/ordersuccess/ordersuccess.component';
import { MobileNumberPipe } from './custom pipes/mobilenumber.pipe';
import { CasechangedirectiveDirective } from './custom directives/casechangedirective.directive';
import { AccessdeniedComponent } from './commonComponents/accessdenied/accessdenied.component';
import { InvalidrouteComponent } from './commonComponents/invalidroute/invalidroute.component';

import { DefaultserviceService } from './services/defaultservice.service';
import { UserService } from './services/userservice.service';
import { AuthserviceService } from './services/authservice.service';
import { CartorderService } from './services/cartorder.service';
import { AdminguardService } from './services/adminguard.service';
import { ProductformService } from './services/productform.service';
import { AuthguardService } from './services/authguard.service';
import { ShoppingcartService } from './services/shoppingcart.service';
import { AngularMaterialModules } from './angularmaterial.module';

import { RouterModule } from '@angular/router';
import { PreloadserviceService } from './services/preloadservice.service';
import { UniqueAsyncValidatorService } from './custom validators service/unique-async-validator.service';
import { ProductCardlistComponent } from './commonComponents/product-cardlist/product-cardlist.component';
import { ProductCategoryComponent } from './commonComponents/product-category/product-category.component';

@NgModule({ 
  declarations: [
    OrdersuccessComponent,
    AccessdeniedComponent,
    InvalidrouteComponent,
    MobileNumberPipe,
    CasechangedirectiveDirective,
    ProductCardlistComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleRoutingModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule,
    CustomFormsModule,
    AngularMaterialModules,
    RouterModule,
    
  ],
  providers:[
    DefaultserviceService,
    UserService,
    ProductformService,
    AuthserviceService,
    AuthguardService,
    AdminguardService,
    ShoppingcartService,
    CartorderService,
    PreloadserviceService,
    UniqueAsyncValidatorService,
  ],
  exports:
  [
    NgbModule,
    ReactiveFormsModule, 
    FormsModule,
    CustomFormsModule,
    AngularMaterialModules,
    RouterModule,
    ProductCardlistComponent,
    ProductCategoryComponent
  ]
})
export class SharedmoduleModule {}
