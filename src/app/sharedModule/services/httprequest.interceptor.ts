import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { RootStoreState } from 'src/app/storeModule/redux/corestore';
import { NgRedux } from '@angular-redux/store';
import { SHOW_LOAD, SHOPPING_SHOW_LOAD } from 'src/app/storeModule/redux/coreaction';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
    securityToken: any;
    constructor(private ngRedux: NgRedux<RootStoreState>) {
       ngRedux.subscribe(() => this.securityToken = ngRedux.getState().logstate.userAuthToken);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('request initiated');
        console.log(request.url);
        if (request.url.match(/shopping\/getProducts/) ||
           request.url.match(/shoppingcategory/)) {
            console.log('shopping request initiated');
            this.ngRedux.dispatch({type: SHOPPING_SHOW_LOAD});
        } else {
            this.ngRedux.dispatch({type: SHOW_LOAD});
        }

        if (request.url.match(/shopping\/addProduct/ ) ||
           request.url.match(/shopping\/deleteProduct/ ) ||
           request.url.match(/shopping\/updateProduct/ )) {
        request = request.clone({setHeaders: {AccessToken: 'securityToken'}});
        }
        return next.handle(request);
    }
}
