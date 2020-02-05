import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendedor } from '../model/vendedor';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http:HttpClient) { }



  getAll(){
    return this.http.get(`http://localhost:8080/vendedor`);
  }

  getById(id: number){
    return this.http.get(`http://localhost:8080/vendedor/${id}`);
  }

  insert(vendedor: Vendedor){
    return this.http.post(`http://localhost:8080/vendedor`, vendedor);
  }

  update(vendedor: Vendedor){
    return this.http.put(`http://localhost:8080/vendedor/`, vendedor);
  }

  logar(vendedor: Vendedor){
    return this.http.post(`http://localhost:8080/vendedor`, vendedor);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/vendedor/${id}`, );
  }

  verificar(vendedor: Vendedor){
    return this.http.post(`http://localhost:8080/vendedor/login`, vendedor);
  }
}
