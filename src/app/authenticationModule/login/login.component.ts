import { Component, OnDestroy } from '@angular/core';
import { AuthserviceService } from '../../sharedModule/services/authservice.service';
import { NgRedux,select } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { USERDATA, RESTORECART} from '../../storeModule/redux/coreaction';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BadRequestError, InternalServerError, 
         NotFounfError, ApplicationError } from '../../sharedModule/custom errors/applicationerrors';
import { take } from 'rxjs/operators';
import { UserService } from '../../sharedModule/services/userservice.service';
import {  pulse } from 'src/app/animations/animatefunction';
import { AnimationEvent } from '@angular/animations';
import { customAnimationSetOne } from 'src/app/animations/custom-animation';
import { ShoppingcartService } from 'src/app/sharedModule/services/shoppingcart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  animations: [customAnimationSetOne,pulse]
})  
export class LoginComponent implements OnDestroy
{
  @select(value=>value.logstate.show) $logState:Observable<object>;
  @select(value=>value.loginstate.username) $username:Observable<object>;
  $errorStatus:Observable<String>;
  $errorCheck:Observable<Boolean>;
  decodedData;
  stateChange:string='animationStateOne';
  cartSummary:any;
  
  constructor(private authservice:AuthserviceService,
              private ngRedux:NgRedux<RootStoreState>,
              private userService:UserService,
              private route:Router,
              private routerState:ActivatedRoute,
              private shoppingService:ShoppingcartService) {}

  logIn(userData)
  {
    this.$errorCheck=of(false);
    console.log(userData);
    this.userService.userPostService(userData)
        .pipe(take(1))
        .subscribe((responseData:any)=>{  
          let authToken:string=responseData.toString();
          localStorage.setItem('authToken',authToken);
          this.decodedData=this.authservice.decodeToken('authToken');
          console.log(this.decodedData);
        },
        (error)=>{
          this.$errorCheck=of(true);
          if(error instanceof BadRequestError) return this.$errorStatus=of('uniqueID or password is wrong');
          if(error instanceof NotFounfError) return this.$errorStatus=of('uniqueID or password is wrong');
          if(error instanceof InternalServerError) return this.$errorStatus=of('internal server error');
          if (error instanceof ApplicationError) return this.$errorStatus=of('unknow error');
        },
        ()=>{
          this.shoppingService.getCartSummary()
                              .subscribe((data:any)=>{
                                this.cartSummary={totalCount:data.totalItemsCount,totalCost:data.totalItemsCost};
                              });
          this.shoppingService.getJSONData()
                .subscribe((data:any)=>{
                  let cartDetails={
                    productItem:[].concat(data.DB_Populate.shoppingdetails.productDetails),
                    totalItemsCost:this.cartSummary.totalCost,
                    totalItemsCount:this.cartSummary.totalCount
                  };
                  this.ngRedux.dispatch({type:RESTORECART,data:{cartList:cartDetails.productItem,
                    itemCount:cartDetails.totalItemsCount,itemCost:cartDetails.totalItemsCost}});
                  });
          this.ngRedux.dispatch({type:USERDATA,data:this.decodedData});
          this.routerState.queryParamMap
              .pipe(take(1))
              .subscribe(queryKey=>{ 
                  if(queryKey.has('requestbackURL')) 
                    this.route.navigate([queryKey.get('requestbackURL')],{queryParams:{user:this.decodedData.name}});
                  if(queryKey.has('shoppingCartURL')) 
                    this.route.navigate([queryKey.get('shoppingCartURL')],{queryParams:{user:this.decodedData.name}});
                  else
                    this.route.navigate(['/authentication/home'],{queryParams:{user:this.decodedData.name}});
                })
         }      
        );
      }
      startAnimationEvent(event)
      {
        //console.log(event);
      }
      endAnimationEvent(event:AnimationEvent)
      {
        if(event.toState == 'animationStateOne') this.stateChange='animationStateTwo';
        else this.stateChange='animationStateOne'
      }
      ngOnDestroy()
      {
        //subscription killed after 1st response
      }
}
