import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  
})
export class ProductformService {

  constructor(private http:HttpClient) { }
  getDropDownValues()
  {
    return this.http.get('http://localhost:3000/shoppingcategory')
             .pipe(map((data:any)=>{return data.categoryList}));
  }
  getProductValues()
  {
    return this.http.get('http://localhost:3000/shopping/getProducts')
                    .pipe(map((data:any)=>{return data.productList}));
  }
  getProductIDList(ID)
  {
    return this.http.get('http://localhost:3000/shopping/getProducts')
                    .pipe(map((data:any)=>{if(data.productList.productID==ID)
                    {
                      console.log(data.productList);
                      return data.productList
                    }}));
  } 
  updateProductList(productData)
  {
    return this.http.post('http://localhost:3000/shopping/updateProduct',productData);
  }
  addProductList(productData)
  {
    return this.http.post('http://localhost:3000/shopping/addProduct',productData);
  }
  deleteProductList(ID)
  {
    return this.http.post('http://localhost:3000/shopping/deleteProduct',{productID:ID});
  }
}