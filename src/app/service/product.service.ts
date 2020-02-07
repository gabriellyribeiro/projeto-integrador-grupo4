import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get("http://localhost:8080/produto");
  }

  getById(id: number) {
    return this.http.get(`http://localhost:8080/produto/${id}`);
  }


  insert(product: Product){
    return this.http.post(`http://localhost:8080/produto/`, product);
  }

  update(product: Product){
    return this.http.put(`http://localhost:8080/produto`, product);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/produto/${id}`);
  }

  getByName(name:string){
    return this.http.get(`http://localhost:8080/produto/nome/${name}`);
  }

}
