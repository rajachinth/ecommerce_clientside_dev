import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { ADDORDER, DELETEORDER, CLEARCART } from '../../storeModule/redux/coreaction';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from './authservice.service'; 

@Injectable({
  providedIn: 'root'
})
export class CartorderService 
{

  constructor(private ngRedux:NgRedux<RootStoreState>,
              private http:HttpClient,
              private jwtService:AuthserviceService) {}

  addOrderCart(cartorderID,CustomerDetails,orderDetails,cartSummary)
  {
    let decodeData=this.jwtService.decodeToken('authToken');
    let obj={userID:decodeData.uniqueID,orderID:cartorderID,productDetails:orderDetails.productItem,
            shipmentDetails:CustomerDetails,orderSummary:cartSummary};
    console.log(obj);
    return this.http.post('http://localhost:3000/order/addOrder',obj);       
  }
  clearCart()
  { 
    let decodeData=this.jwtService.decodeToken('authToken');
    let obj={userID:decodeData.uniqueID};
    console.log(obj);
    this.http.post('http://localhost:3000/shoppingCart/clearCart',obj)
             .subscribe((v)=>{},
             (error)=>{console.log(error)},
             ()=>{this.ngRedux.dispatch({type:CLEARCART});});
  }
  deleteOrderCart(CartorderID)
  {
    let decodeData=this.jwtService.decodeToken('authToken');
    let obj={userID:decodeData.uniqueID,orderID:CartorderID};
    console.log(obj);
    if(!confirm('Is this order to be deleted ?')) return;
    this.http.post('http://localhost:3000/order/deleteOrder',obj)
             .subscribe((v)=>{},
             (error)=>{console.log(error)},
             ()=>{this.ngRedux.dispatch({type:DELETEORDER,data:{orderID:CartorderID}});});
    console.log(this.ngRedux.getState().orderstate);
  }
}
