import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService implements CanActivate {
  constructor(private authservice: AuthserviceService, private route: Router) { }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    if (this.authservice.loginStatus) { return true; } else { this.route.navigate(['/routeRedirect/accessdenied'], {queryParams: {requestbackURL: routerState.url}}); }
  }

}
