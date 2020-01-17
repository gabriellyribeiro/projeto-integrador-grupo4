
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../model/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ Globals ]
})
export class LoginComponent implements OnInit {



  usuario: Usuario = new Usuario(0,'','','','');

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
  }

  verifica(){
    var a = document.getElementById("erro2");
    var senha = document.getElementById("erro1");
    var email = document.getElementById("erro3");

    if(this.usuario.email == '' && this.usuario.senha == ''){
        
      a.className = "alert alert-primary";
      
    }else if(this.usuario.senha == ''){
     
      senha.className = "alert alert-primary";
      a.className = "alert alert-primary hidden";
      email.className = "alert alert-primary hidden";
    }else if(this.usuario.email == ''){
     
      email.className = "alert alert-primary";
      a.className = "alert alert-primary hidden";
      senha.className = "alert alert-primary hidden";
          
    }else{
      a.className = "alert alert-primary hidden";
      senha.className = "alert alert-primary hidden";
      email.className = "alert alert-primary hidden";
    this.usuarioService.verificar(this.usuario).subscribe((usuario: Usuario)=>{
      this.usuario = usuario;
   
      alert("Usuario existente");
      Globals.USUARIO = usuario;
      this.router.navigate(['user-page']);
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
      alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
      //this.router.navigate(['login']);
    });
  }
  }

}
