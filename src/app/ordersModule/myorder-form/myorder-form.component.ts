import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { RootStoreState } from '../../storeModule/redux/corestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-myorder-form',
  templateUrl: './myorder-form.component.html',
  styleUrls: ['./myorder-form.component.css']
})
export class MyorderFormComponent {

  @select(element => element.orderstate) $orderList;
  orderID;

  constructor(ngRedux: NgRedux<RootStoreState>, private route: ActivatedRoute) {
    this.orderID = this.route.snapshot.paramMap.get('orderID');
  }


}
