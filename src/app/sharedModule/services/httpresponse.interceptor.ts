import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry, timeout, finalize } from 'rxjs/operators';
import { BadRequestError, NotFounfError, InternalServerError, ApplicationError, ConflictError } from '../custom errors/applicationerrors';
import { NgRedux } from '@angular-redux/store';
import { RootStoreState } from 'src/app/storeModule/redux/corestore';
import { ADDSECRET, HIDE_LOAD, SHOPPING_HIDE_LOAD } from 'src/app/storeModule/redux/coreaction';

@Injectable({
    providedIn: 'root'
})
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor(private ngRedux: NgRedux<RootStoreState>) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
                   .pipe(retry(2),
                    timeout(7000),
                    catchError((error: Response) => {
                    if (error.status == 400) {
                      return throwError(new BadRequestError(error, 400));
                    }
                    if (error.status == 404) {
                      return throwError(new NotFounfError(error, 404));
                    }
                    if (error.status == 500) {
                      return throwError(new InternalServerError(error, 500));
                    }
                    if (error.status == 409) {
                      return throwError(new ConflictError(error, 409));
                    } else {
                      return throwError(new ApplicationError(error));
                    }
                   }),
                    tap((response: HttpEvent<any>) => {
                    if (response instanceof HttpResponse && response.headers.has('AuthToken')) {
                        const reponseToken = response.headers.get('AuthToken');
                        console.log(reponseToken);
                        this.ngRedux.dispatch({type: ADDSECRET, data: {token: reponseToken}});
                    }},
                    (error) => { console.log(error); },
                    () => { console.log('HTTP response completed successfully'); }),
                    finalize(() => {
                      if (request.url.match(/shopping\/getProducts/) || request.url.match(/shoppingcategory/)) {
                          this.ngRedux.dispatch({type: SHOPPING_HIDE_LOAD});
                      } else {
                          this.ngRedux.dispatch({type: HIDE_LOAD});
                      }
                    })
                    ); }
  }

