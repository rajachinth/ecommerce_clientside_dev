import { Component,Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductformService } from '../../services/productform.service';
import { EventEmitter } from '@angular/core';
import { select } from '@angular-redux/store';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent
{
  @select(value=>value.logstate.show) $logState:Observable<object>;
  @Input('currentUser') currentUser;
  @Input('categoryParamsValue') categoryParamsValue;
  @Output('customevent') clickEvent=new EventEmitter();
  @Input('categoryList') categoryList;

  onclick() { this.clickEvent.emit('event raised on click'); }
}
