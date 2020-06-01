import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductformService } from '../../sharedModule/services/productform.service';
import { Observable, Subscription, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { BadRequestError, InternalServerError,
  NotFounfError, ApplicationError } from '../../sharedModule/custom errors/applicationerrors';
import { AdminProducts } from 'src/app/sharedModule/models/admin-products';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit, OnDestroy {

  $categoryList: Observable<object>;
  currentUser;
  productListData = [];
  productIDValue:AdminProducts=
  {
    productID: null,
    title: null,
    price: null,
    category: null,
    author:null,
    imageURL: null,
  }
  id;
  subsciption: Subscription;

  @select(value => value.logstate.show) $logState: Observable<object>;
  $errorStatus: Observable<String>;
  $errorCheck: Observable<Boolean>;

  constructor(private productService: ProductformService,
              private router: Router,
              private routeState: ActivatedRoute) { }
  ngOnInit() {
    this.$errorCheck = of(false);
    this.subsciption = this.routeState.paramMap
        .subscribe(routestate => this.currentUser = routestate.get('username'));
    this.$categoryList = this.productService.getDropDownValues();
    this.id = this.routeState.snapshot.paramMap.get('productID');
    console.log(this.id);
    if (this.id) { this.subsciption = this.productService.getProductValues()
                          .subscribe(productValue => {this.productListData = productValue;
                                                      console.log(this.productListData);
                                                      this.productListData.forEach(element => { if (element.productID == this.id) {this.productIDValue = element; } });
                                                      console.log(this.productIDValue);
                          },
                          (error) => {
                            this.$errorCheck = of(true);
                            if (error instanceof BadRequestError) { return this.$errorStatus = of('invalid data to process'); }
                            if (error instanceof NotFounfError) { return this.$errorStatus = of('invalid data to process'); }
                            if (error instanceof InternalServerError) { return this.$errorStatus = of('internal server error'); }
                            if (error instanceof ApplicationError) { return this.$errorStatus = of('unknow error'); }
                          });
    }
  }
  submit(productDetails) {
    if (this.id) {  return this.productService.updateProductList(productDetails).subscribe((responseData) => {},
      (error) => {
        this.$errorCheck = of(true);
        if (error instanceof BadRequestError) { return this.$errorStatus = of('invalid data to process'); }
        if (error instanceof NotFounfError) { return this.$errorStatus = of('invalid data to process'); }
        if (error instanceof InternalServerError) { return this.$errorStatus = of('internal server error'); }
        if (error instanceof ApplicationError) { return this.$errorStatus = of('unknow error'); }
      },
      () => { this.router.navigate(['/routeRedirect/ordersuccess']); });
    }
    this.productService.addProductList(productDetails).subscribe((responseData) => {},
    (error) => {
      this.$errorCheck = of(true);
      if (error instanceof BadRequestError) { return this.$errorStatus = of('invalid data to process'); }
      if (error instanceof NotFounfError) { return this.$errorStatus = of('invalid data to process'); }
      if (error instanceof InternalServerError) { return this.$errorStatus = of('internal server error'); }
      if (error instanceof ApplicationError) { return this.$errorStatus = of('unknow error'); }
    },
    () => { this.router.navigate(['/routeRedirect/ordersuccess']); });
  }
  delete() {
    if (this.id) {
      if (!confirm('Is product to be deleted ?')) { return; }
      this.productService.deleteProductList(this.id).subscribe((responseData) => {},
      (error) => {
        this.$errorCheck = of(true);
        if (error instanceof BadRequestError) { return this.$errorStatus = of('invalid data to process'); }
        if (error instanceof NotFounfError) { return this.$errorStatus = of('invalid data to process'); }
        if (error instanceof InternalServerError) { return this.$errorStatus = of('internal server error'); }
        if (error instanceof ApplicationError) { return this.$errorStatus = of('unknow error'); }
      },
      () => { this.router.navigate(['/routeRedirect/ordersuccess']); });
    }
    this.$errorCheck = of(true);
    this.$errorStatus = of('invalid data to process');
  }
  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }
}
