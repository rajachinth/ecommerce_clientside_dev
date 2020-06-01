import { Component, OnInit, Input } from '@angular/core';
import { ShoppingcartService } from '../../services/shoppingcart.service';
import { ProductCard } from '../../models/product-card';
import { customAnimationSetOne } from 'src/app/animations/custom-animation';
import { AuthserviceService } from '../../services/authservice.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { RootStoreState } from 'src/app/storeModule/redux/corestore';
import { ADDCART, DELETECART } from 'src/app/storeModule/redux/coreaction';

@Component({
  selector: 'app-product-cardlist',
  templateUrl: './product-cardlist.component.html',
  styleUrls: ['./product-cardlist.component.css'],
  animations: []
})
export class ProductCardlistComponent {
  @Input('items') items;
  @Input('isActive') isActive;

  itemDetails: ProductCard[] = [{
    isItemAdded: false,
    itemCount: 0
  }];
  constructor(private shoppingCartService: ShoppingcartService,
              private authService: AuthserviceService,
              private route: Router,
              private ngRedux: NgRedux<RootStoreState>) { }

  addToCart(itemList) {
    if (!this.authService.loginStatus()) {
      const routerURL = this.route.routerState.snapshot.url;
      return this.route.navigate(['/authentication/login'], {queryParams: {shoppingCartURL: routerURL}});
    }
    this.shoppingCartService.addCartItems(itemList)
                            .subscribe((v) => {},
                            (error) => {console.log(error); },
                            () => {
                              this.ngRedux.dispatch({type: ADDCART, data: itemList});
                              this.itemDetails = this.shoppingCartService.itemDetails(itemList.productID); }
                            );
  }
  deleteFromcart(itemList) {
    this.shoppingCartService.deleteCartItems(itemList)
                            .subscribe((v) => {},
                                                (error) => {console.log(error); },
                                                () => {
                                                  this.ngRedux.dispatch({type: DELETECART, data: itemList});
                                                  this.itemDetails = this.shoppingCartService.itemDetails(itemList.productID);
                                                });

  }
}
