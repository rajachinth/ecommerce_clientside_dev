import { Injectable } from '@angular/core';
import { AuthserviceService } from './authservice.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate
{
  constructor(private authservice:AuthserviceService,private route:Router) { }

  canActivate(activeRoute:ActivatedRouteSnapshot,routerState:RouterStateSnapshot)
  {
    if(this.authservice.loginStatus())
    {
      let decodevalue=this.authservice.decodeToken('authToken');
      if(decodevalue.admin) return true;
      else return false;
    }
    else this.route.navigate(['/routeRedirect/accessdenied'],{queryParams:{requestbackURL:routerState.url}});
  }
}
