import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-deletar',
  templateUrl: './usuario-deletar.component.html',
  styleUrls: ['./usuario-deletar.component.css']
})
export class UsuarioDeletarComponent implements OnInit {
  
  novo: boolean = false;
  valido: boolean = false;

  usuario: Usuario = new Usuario(0,'','','','','',null,null);
  usuarios = []

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let id:number = this.route.snapshot.params["id"];


    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;

      
    }
  }

  btnSim(){
    this.usuarioService.delete(this.usuario.idUsuario).subscribe((response:string)=>{
      this.router.navigate(['usuario-listar']);
    }, err => {
      //console.log(err);
      this.router.navigate(['usuario-listar']);
    });
  }
  

  findById(id: number){
    this.usuarioService.getById(id).subscribe((usuario: Usuario) =>{
     this.usuario = usuario; 
     
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  redirect(){
    this.router.navigate(['usuario-listar']);
  }
}
