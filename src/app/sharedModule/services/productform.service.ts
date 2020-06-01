import { Injectable } from '@angular/core';
import { of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductformService {

  constructor(private http: HttpClient) { }
  getDropDownValues() {
    return this.http.get('https://online-book-shelf.herokuapp.com/shoppingcategory')
             .pipe(map((data: any) => data.categoryList));
  }
  getProductValues() {
    return this.http.get('https://online-book-shelf.herokuapp.com/shopping/getProducts')
                    .pipe(map((data: any) => data.productList));
  }
  getProductIDList(ID) {
    return this.http.get('https://online-book-shelf.herokuapp.com/shopping/getProducts')
                    .pipe(map((data: any) => {if (data.productList.productID == ID) {
                      console.log(data.productList);
                      return data.productList;
                    }}));
  }
  updateProductList(productData) {
    return this.http.post('https://online-book-shelf.herokuapp.com/shopping/updateProduct', productData);
  }
  addProductList(productData) {
    return this.http.post('https://online-book-shelf.herokuapp.com/shopping/addProduct', productData);
  }
  deleteProductList(ID) {
    return this.http.post('https://online-book-shelf.herokuapp.com/shopping/deleteProduct', {productID: ID});
  }
}
