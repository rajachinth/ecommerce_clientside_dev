import { Component } from '@angular/core';
import { ShoppingcartService } from 'src/app/sharedModule/services/shoppingcart.service';
import { select } from '@angular-redux/store';
import { Observable, of } from 'rxjs';
import { BadRequestError, InternalServerError, 
  NotFounfError, ApplicationError } from '../../sharedModule/custom errors/applicationerrors';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  
{
  @select(value=>value.logstate.show) $logState:Observable<object>;
  $errorStatus:Observable<String>;
  $errorCheck:Observable<Boolean>;
  jsonData;
  constructor(private shoppingService:ShoppingcartService) { }
  logData()
  { 
    this.$errorCheck=of(false);
    this.shoppingService.getJSONData()
                        .subscribe((value)=>{this.jsonData=value},
                        (error)=>{
                        this.$errorCheck=of(true);
                        if(error instanceof BadRequestError) return this.$errorStatus=of('something went wrong');
                        if(error instanceof NotFounfError) return this.$errorStatus=of('something went wrong');
                        if(error instanceof InternalServerError) return this.$errorStatus=of('internal server error');
                        if (error instanceof ApplicationError) return this.$errorStatus=of('unknow error');
                      },);
  }

}
