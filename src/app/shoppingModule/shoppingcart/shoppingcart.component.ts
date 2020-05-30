import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductformService } from '../../sharedModule/services/productform.service';
import { AdminProducts } from '../../sharedModule/models/admin-products';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';
import { customAnimationSetTwo } from 'src/app/animations/custom-animation';
import { AnimationEvent } from '@angular/animations';
import { select } from '@angular-redux/store';
import { BadRequestError, InternalServerError, 
        NotFounfError, ApplicationError } from '../../sharedModule/custom errors/applicationerrors';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
  animations: [customAnimationSetTwo],
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShoppingcartComponent implements OnInit,OnDestroy
{
  @select(value=>value.logstate.shoppingServer) $logState:Observable<object>;
  $errorStatusProducts:Observable<String>;
  $errorStatusCategory:Observable<String>;
  $errorCheck:Observable<Boolean>;
  productList:AdminProducts[]=[];
  filterProductList:{}[]=[];
  categoryParamsValue;
  currentUser;
  subsciption:Subscription;
  animationState:string='animationStateOne';
  categoryList;

  constructor(private routerState:ActivatedRoute,
              private productService:ProductformService,
              ) { }

  ngOnInit()
  {
       this.$errorCheck=of(false);
       this.currentUser=this.routerState.snapshot.queryParamMap.get('user');
       this.subsciption=this.productService
                            .getProductValues()
                            .pipe(switchMap((productItem)=>{
                              this.productList=productItem;
                              return this.routerState.queryParamMap
                            }))
                              .subscribe((paramState=>{
                                this.categoryParamsValue=paramState.get('id');
                                this.filterProductList=(this.categoryParamsValue) ?
                                this.productList.filter(item=>item.category == this.categoryParamsValue)
                                : this.productList;
                          }),
                          (error)=>{
                            this.$errorCheck=of(true);
                            if(error instanceof InternalServerError) return this.$errorStatusProducts=of('internal server error');
                            if (error instanceof ApplicationError) return this.$errorStatusProducts=of('unknow error');},
                            ()=>{});
       this.subsciption=this.productService
                            .getDropDownValues()
                            .subscribe(v=>{this.categoryList=v;console.log(this.categoryList);},
                            (error)=>{
                              this.$errorCheck=of(true);
                              if(error instanceof InternalServerError) return this.$errorStatusCategory=of('internal server error');
                              if (error instanceof ApplicationError) return this.$errorStatusCategory=of('unknow error');},
                              ()=>{}); 
  }
  animationStartEvent(event)
  {
    console.log(event);
  }
  animationEndEvent(event:AnimationEvent)
  { 
    return;
  }
  onclickEvent(event)
  {
    console.log(event);
    if(this.animationState == 'animationStateOne') this.animationState='animationStateTwo';
      else this.animationState='animationStateOne'
  }
  ngOnDestroy(): void {
    this.subsciption.unsubscribe()
  }
}
