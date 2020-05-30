import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationmoduleRoutingModule } from './authenticationmodule-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedmoduleModule } from '../sharedModule/sharedmodule.module';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModules } from '../sharedModule/angularmaterial.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AuthenticationmoduleRoutingModule,
    SharedmoduleModule,
    AngularMaterialModules
  ]
})
export class AuthenticationmoduleModule { }
