import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.css']
})
export class UsuarioNovoComponent implements OnInit {
 
 
  novo: boolean = false;

  usuario: Usuario = new Usuario(0,'','','','');
  

  constructor(private route: ActivatedRoute, private usuarioService:UsuarioService) { }

  ngOnInit() {

    let id:number = this.route.snapshot.params["id"];
    
    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;
    }


  }

  findById(id: number){
    this.usuarioService.getById(id).subscribe((usuario: Usuario) =>{
     this.usuario = usuario; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }


  salvar(){
    if(this.novo){
      this.usuarioService.insert(this.usuario).subscribe((usuario: Usuario) =>{
        this.usuario = usuario;
        this.novo = false;
        alert("Dado inserido com sucesso!");
      });
    } else {
      this.usuarioService.update(this.usuario).subscribe((usuario: Usuario) =>{
        this.usuario = usuario;
        alert("Alterado com sucesso");
      });
    }
  }

}
