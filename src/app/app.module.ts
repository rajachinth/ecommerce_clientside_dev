import { NgModule, } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedmoduleModule } from './sharedModule/sharedmodule.module';
import { JwtModule, } from '@auth0/angular-jwt';
import { StoreModuleModule } from './storeModule/storemodule.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './sharedModule/services/httprequest.interceptor';
import { HttpResponseInterceptor } from './sharedModule/services/httpresponse.interceptor';

export function tokenGetter() {
  return localStorage.getItem('default_auth_token');
}

@NgModule({
  declarations: [ AppComponent ],
  imports:
  [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedmoduleModule,
    HttpClientModule,
    JwtModule.forRoot({ config: {tokenGetter, whitelistedDomains: ['localhost:3000']} }),
    StoreModuleModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true}
   ],
  bootstrap: [AppComponent]
})
export class AppModule {}
