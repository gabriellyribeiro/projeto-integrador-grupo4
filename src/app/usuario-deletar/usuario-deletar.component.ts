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

  usuario: Usuario = new Usuario(0,'','','','','');
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

  deletar(id : number){
    if(this.novo){
      this.usuarioService.delete(id).subscribe(() =>{
        this.novo = false;
        alert("usuario deletado!")
      
         
      });
    } 
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
