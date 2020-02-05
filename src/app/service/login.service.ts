import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Vendedor } from '../model/vendedor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public log: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient) { }

  login(login: Usuario){
    return this.http.post(`http://localhost:8080/usuario/login`, login);
  }

  loginVendedor(login: Vendedor){
    return this.http.post(`http://localhost:8080/vendedor/login`, login);
  }
}
