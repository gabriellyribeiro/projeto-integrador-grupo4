
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../service/usuario.service';



@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {

  usuarios = []
  constructor(private usuarioService : UsuarioService) { }
  
  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.usuarioService.getAll().subscribe((usuario: Usuario[])=>{
      this.usuarios = usuario;
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
    });
  }
}
