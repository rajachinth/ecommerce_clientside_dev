import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { LOGINSTATE } from './storeModule/redux/loginstore';
import { AuthserviceService } from './sharedModule/services/authservice.service';
import { USERDATA } from './storeModule/redux/coreaction';
import { RootStoreState } from './storeModule/redux/corestore';
import { customAnimationSetTwo } from './animations/custom-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [customAnimationSetTwo]
})
export class AppComponent implements OnInit, OnDestroy {
  public queryParamsValue = '?';

  @select(value => value.loginstate) $loginData: Observable<object>;
  @select(value => value.cartstate) $cartState: Observable<any>;
  subsciption: Subscription;

  constructor(private authservice: AuthserviceService,
              private ngRedux: NgRedux<RootStoreState>,
              private route: Router,
              private routerState: ActivatedRoute,
              ) {
    ngRedux.subscribe(() => {
        console.log(ngRedux.getState());
    });
    // console.log(this.queryParamsValue);
   }

  ngOnInit() {
    console.log(this.route.routerState.snapshot.url);
    this.subsciption = combineLatest(this.routerState.queryParamMap)
    .subscribe((paramState => {
      if (!(paramState[0].get('user'))) { return '?'; }
      this.queryParamsValue = paramState[0].get('user');
    }));
    if (this.authservice.loginStatus()) {
      /*
      const decodedData=this.authservice.decodeToken('authToken');
      this.ngRedux.dispatch({type:USERDATA,data:decodedData});
      this.route.navigate(['/shopping/shoppingList'],{queryParams:{user:decodedData.name}});
      */
     // this.authservice.logoutService();
    }
  }
  logOut() {
    localStorage.removeItem('authToken');
    this.ngRedux.dispatch({type: USERDATA, data: LOGINSTATE});
    this.route.navigate(['/authentication/login']);
  }
  routeTransitionAnimation(outletIdentifier) {
    // console.log(outletIdentifier.activatedRouteData['animation']);
    return outletIdentifier.activatedRouteData.animation;
  }
  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
  /*
  animateRoute(outlet)
  {
    const ou=outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    console.log(ou);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  */
}
