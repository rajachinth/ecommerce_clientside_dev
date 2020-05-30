import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessdenied',
  templateUrl: './accessdenied.component.html',
  styleUrls: ['./accessdenied.component.css']
})
export class AccessdeniedComponent implements OnInit,OnDestroy {
  public queryParam;
  subscription: Subscription;
  constructor(private routeState:ActivatedRoute) { }

  ngOnInit() 
  {
    this.subscription=this.routeState.queryParamMap
        .subscribe(paramap=>{
          this.queryParam=paramap.get('requestbackURL');
        });
  }
  ngOnDestroy() 
  {
    this.subscription.unsubscribe();
  }

}
