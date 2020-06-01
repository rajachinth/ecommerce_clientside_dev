import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{path: '', children: [
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'home', component: HomeComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationmoduleRoutingModule { }
