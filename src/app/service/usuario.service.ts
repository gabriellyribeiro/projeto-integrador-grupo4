import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }




  getAll(){
    return this.http.get(`http://localhost:8080/usuario`);
  }

  getById(id: number){
    return this.http.get(`http://localhost:8080/usuario/${id}`);
  }

  insert(usuario: Usuario){
    return this.http.post(`http://localhost:8080/usuario`, usuario);
  }

  update(usuario: Usuario){
    return this.http.put(`http://localhost:8080/usuario/`, usuario);
  }

  logar(usuario: Usuario){
    return this.http.post(`http://localhost:8080/usuario`, usuario);
  }

  verificar(usuario: Usuario){
    return this.http.post(`http://localhost:8080/usuario/login`, usuario);
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/usuario/${id}`, );
  }
  
}
