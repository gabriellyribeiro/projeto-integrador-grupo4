import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/globals';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [ Globals ]
})
export class UserPageComponent implements OnInit {

  usuario: Usuario;

  constructor(private router: Router) { 

  }

  ngOnInit() {

   // var nome = document.getElementById("nome");
   // var email = document.getElementById("email");
   // var tel = document.getElementById("telefone");
  
    if (Globals.USUARIO == undefined){
      this.router.navigate(['/login']);
      }
      else{
        //console.log(this.usuario.nome);
      this.usuario = Globals.USUARIO;
     // nome.innerHTML = this.usuario.nome;
     // email.innerHTML = this.usuario.email;
     // tel.innerHTML = this.usuario.telefone;
      }
      
  }

}
