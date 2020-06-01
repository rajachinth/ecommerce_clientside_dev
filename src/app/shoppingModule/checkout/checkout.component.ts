import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { ShoppingcartService } from '../../sharedModule/services/shoppingcart.service';
import { AuthserviceService } from '../../sharedModule/services/authservice.service';
import { CartorderService } from 'src/app/sharedModule/services/cartorder.service';
import { ADDCART, DELETECART } from 'src/app/storeModule/redux/coreaction';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  @select(element => element.cartstate) $cartState;

  constructor(private cartService: CartorderService,
              private shoppingCartService: ShoppingcartService,
              private authservice: AuthserviceService,
              private ngRedux: NgRedux<RootStoreState>) { }

  addToCart(itemList) {
    console.log(itemList);
    this.shoppingCartService.addCartItems(itemList)
                            .subscribe((v) => {},
                            (error) => {console.log(error); },
                            () => {
                              this.ngRedux.dispatch({type: ADDCART, data: itemList});
                            });
  }
  deleteFromcart(itemList) {
    this.shoppingCartService.deleteCartItems(itemList)
                            .subscribe((v) => {},
                            (error) => {console.log(error); },
                            () => {
                            this.ngRedux.dispatch({type: DELETECART, data: itemList});
                            });
  }
  clearCart() {
    this.cartService.clearCart();
  }
}
