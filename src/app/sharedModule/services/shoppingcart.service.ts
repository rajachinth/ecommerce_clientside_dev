import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { ADDCART, DELETECART } from '../../storeModule/redux/coreaction';
import { Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService implements OnDestroy {
  cartItemTracker: any[];
  subscription: Subscription;
  totalCartValue: any;
  filterCartValue: any;
  filterSort: any[];
  iteration = 0;

  constructor(private ngRedux: NgRedux<RootStoreState>, private http: HttpClient,
              private jwtService: AuthserviceService) {
    this.ngRedux.subscribe(() => {
        this.cartItemTracker = this.ngRedux.getState().cartstate.productItem;
      });
  }
  getCartSummary() {
    const decodeData = this.jwtService.decodeToken('authToken');
    console.log(decodeData.uniqueID);
    const obj = {userID: decodeData.uniqueID};
    return this.http.post('https://online-book-shelf.herokuapp.com/shoppingCart/summary', obj);
  }
  addCartItems(cartList) {
    const decodeData = this.jwtService.decodeToken('authToken');
    console.log(decodeData.uniqueID);
    const obj = {userID: decodeData.uniqueID, productID: cartList.productID, title: cartList.title,
            price: cartList.price, imageURL: cartList.imageURL};
    console.log(obj);
    return this.http.post('https://online-book-shelf.herokuapp.com/shoppingCart/addItem', obj);
  }
  deleteCartItems(cartList) {
    const decodeData = this.jwtService.decodeToken('authToken');
    console.log(decodeData.uniqueID);
    const obj = {userID: decodeData.uniqueID, productID: cartList.productID};
    console.log(obj);
    return this.http.post('https://online-book-shelf.herokuapp.com/shoppingCart/deleteItem', obj);
  }
  getJSONData() {
    if (this.jwtService.loginStatus()) {
      const decodeData = this.jwtService.decodeToken('authToken');
      console.log(decodeData.userID);
      const obj = {uniqueID: decodeData.userID};
      return this.http.post('https://online-book-shelf.herokuapp.com/ecommerce/userData/populate', obj);
    }
    return of({error: 'please login to view the user JSON data'});
  }
  itemDetails(itemID) {
    console.log(this.cartItemTracker);
    console.log(itemID);
    this.filterSort = this.cartItemTracker.filter((element) => {
    if (element.productID == itemID) {
        this.iteration = this.iteration + 1;
        this.filterCartValue = [{ isItemAdded: true, itemCount: element.itemCount}];
        return element;
      }});

    if (this.filterSort.length == 0) {
      return [{isItemAdded: false, itemCount: 0}];
    } else {
      return this.filterCartValue;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
