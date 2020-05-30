import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators"
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultserviceService {

  constructor(@Inject(String)private url:string, private http:HttpClient) { }
  getdata()
  {
    return this.http.get(this.url)
     .pipe(catchError((error:Response)=>{
       return throwError(error);
     }));
  }
  postdata(data)
  {
    return this.http.post(this.url,data)
     .pipe(catchError((error:Response)=>{
       return throwError(error);
     }));
  };
  updatedata(data)
  {
    this.http.put(this.url,data)
     .pipe(catchError((error:Response)=>{
       return throwError(error);
     }));
  }
  deletedata(data)
  {
    this.http.delete(this.url,data)
     .pipe(catchError((error)=>{
       return throwError(error);
     }));
  }
}
