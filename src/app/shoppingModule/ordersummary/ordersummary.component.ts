import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoSpecialCharacterValidation } from '../../sharedModule/custom validators/nospecialcharacter.component';
import { select, NgRedux } from '@angular-redux/store';
import { CartorderService } from '../../sharedModule/services/cartorder.service';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { ShoppingcartService } from '../../sharedModule/services/shoppingcart.service';
import { ADDORDER } from 'src/app/storeModule/redux/coreaction';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css']
})
export class OrdersummaryComponent implements OnInit
{
  orderForm;
  orderDetails;
  orderSummary;
  @select(element=>element.cartstate) $cartstate;

  constructor(formBuilder:FormBuilder, 
              private orderService:CartorderService,
              private ngRedux:NgRedux<RootStoreState>,
              private route:Router,
              private shoppingCart:ShoppingcartService) 
  {
    this.orderForm=formBuilder.group({
      name:formBuilder.control('',[Validators.required,
                                  Validators.minLength(4),
                                  Validators.maxLength(15),
                                  NoSpecialCharacterValidation.noSpecialCharcterValidation]),
      address:formBuilder.control('',[
                                  Validators.required,
                                  Validators.maxLength(50)]),
      pincode:formBuilder.control('',Validators.required),
      mobile:formBuilder.control('', Validators.required) });
  }
  ngOnInit() {
    this.shoppingCart.getCartSummary()
                     .subscribe((data:any)=>{
                      this.orderSummary={totalItemCount:data.totalItemsCount,totalItemCost:data.totalItemsCost};
                     });
  }
  confirmOrder(CustomerDetails,orderDetails)
  {
    let orderID=uuidv4();
    let orderSummary=this.orderSummary;
    this.orderService.addOrderCart(orderID,CustomerDetails,orderDetails,orderSummary)
        .subscribe((v)=>{},
        (error)=>{console.log(error)},
        ()=>{
          this.ngRedux.dispatch({type:ADDORDER,data:{cartorderID:orderID,CustomerDetails,orderDetails}});
          this.orderService.clearCart();
          this.route.navigate(['/routeRedirect/ordersuccess'],{queryParams:{customerOrderID:orderID}});
        });   
  }
}
