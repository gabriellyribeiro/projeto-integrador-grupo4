import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/globals';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [ Globals ]
})
export class UserPageComponent implements OnInit {

  usuario: Usuario;
  user: string;
  email: string;
  
  constructor(private router: Router, private loginService: LoginService) { 

  }

  ngOnInit() {

   // var nome = document.getElementById("nome");
   // var email = document.getElementById("email");
   // var tel = document.getElementById("telefone");
  
   // if (Globals.USUARIO == undefined){
   //   this.router.navigate(['/login']);

   if (!localStorage.getItem("token")) {
    alert("Você não pode acessar está página sem estar logado")
    this.router.navigate(['login']);

  }
  else {
    this.user = localStorage.getItem("nome");
    alert("Logado")
    this.loginService.log.next(true); 
    //this.usuario = Globals.USUARIO;
    this.user = localStorage.getItem("nome");
    this.email = localStorage.getItem("usuarioEmail");
   // this.router.navigate(['user-page']);
  }

      }
    //  else{
        //console.log(this.usuario.nome);
   
     // nome.innerHTML = this.usuario.nome;
     // email.innerHTML = this.usuario.email;
     // tel.innerHTML = this.usuario.telefone;
      
      
  logout(){
    
    this.loginService.log.next(false);
    localStorage.clear();
  
    this.router.navigate(['login']);
  }
  

}
