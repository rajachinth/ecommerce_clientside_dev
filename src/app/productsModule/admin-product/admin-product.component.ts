import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductformService } from '../../sharedModule/services/productform.service';
import { AdminProducts } from '../../sharedModule/models/admin-products';
import { select } from '@angular-redux/store';
import { InternalServerError, ApplicationError } from 'src/app/sharedModule/custom errors/applicationerrors';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy {

  $curentUser: Observable<string>;
  $productLists: Observable<Object>;
  productLists: AdminProducts[];
  filterLists: any[];
  subscription: Subscription;

  @select(value => value.logstate.shoppingServer) $logState: Observable<object>;
  $errorStatusProducts: Observable<String>;
  $errorCheck: Observable<Boolean>;

  constructor(private routerState: ActivatedRoute,
              private productService: ProductformService) {
    this.$errorCheck = of(false);
    this.subscription = this.productService.getProductValues()
                          .subscribe((productValue: any) => this.filterLists = this.productLists = productValue,
                          (error) => {
                            this.$errorCheck = of(true);
                            if (error instanceof InternalServerError) { return this.$errorStatusProducts = of('internal server error'); }
                            if (error instanceof ApplicationError) { return this.$errorStatusProducts = of('unknow error'); }
                          });
  }

  ngOnInit() {
    this.$curentUser = this.routerState.paramMap
        .pipe(map(routerstate => routerstate.get('username')))
        .pipe(tap((value) => {console.log(value); }));
  }
  filter(searchKey: string) {
    console.log(searchKey);
    this.filterLists = (searchKey) ?
      this.productLists.filter(productValue =>
            productValue.title.toLowerCase().includes(searchKey.toLowerCase()))
            : this.productLists;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
