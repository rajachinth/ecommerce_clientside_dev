import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { CartorderService } from '../../sharedModule/services/cartorder.service';
import { ADDORDER, CLEARORDER } from 'src/app/storeModule/redux/coreaction';
import { ShoppingcartService } from 'src/app/sharedModule/services/shoppingcart.service';
import { BadRequestError, InternalServerError,
  NotFounfError, ApplicationError } from '../../sharedModule/custom errors/applicationerrors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  @select(element => element.orderstate) $orderList;
  @select(value => value.logstate.show) $logState: Observable<object>;
  $errorStatus: Observable<String>;
  $errorCheck: Observable<Boolean>;

  constructor(private ngRedux: NgRedux<RootStoreState>,
              private orderService: CartorderService,
              private shoppingService: ShoppingcartService) { }

  ngOnInit() {
      this.ngRedux.dispatch({type: CLEARORDER});
      this.$errorCheck = of(false);
      this.shoppingService.getJSONData()
                .subscribe((data: any) => {
                  const DBPopulate: [] = data.DB_Populate.orderlist;
                  DBPopulate.forEach((value: any) => {
                    const orderID = value.orderDetails.orderID;
                    const orderDate = value.orderDetails.orderDate;
                    const CustomerDetails = {
                      name: value.shippingDetails.name,
                      address: value.shippingDetails.address,
                      pincode: value.shippingDetails.pincode,
                      mobile: value.shippingDetails.mobile,
                  };
                    const orderDetails = {
                    productItem: [].concat(value.orderDetails.productDetails),
                    totalItemsCost: value.orderDetails.productSummary.totalItemCount,
                    totalItemsCount: value.orderDetails.productSummary.totalItemCost
                  };
                    this.ngRedux.dispatch({type: ADDORDER, data: {cartorderID: orderID, CustomerDetails, orderDetails, orderDate}});
                  }); },
                  (error) => {
                    this.$errorCheck = of(true);
                    if (error instanceof BadRequestError) { return this.$errorStatus = of('error occured while fetching old orders'); }
                    if (error instanceof NotFounfError) { return this.$errorStatus = of('error occured while fetching old orders'); }
                    if (error instanceof InternalServerError) { return this.$errorStatus = of('internal server error occured while fetching old orders'); }
                    if (error instanceof ApplicationError) { return this.$errorStatus = of('unknow server error occured while fetching old orders'); }
                  }
                  );
    }
  deleteOrder(orderID) {
    console.log(orderID);
    this.orderService.deleteOrderCart(orderID);
  }
 /* ngOnDestroy()
  {
    this.ngRedux.dispatch({type:CLEARORDER});
  }
  */
}
