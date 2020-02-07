import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/globals';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Vendedor } from '../model/vendedor';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [ Globals ]
})
export class UserPageComponent implements OnInit {

  usuario: Usuario;
  vendedor: Vendedor;
  
  user: string;
  email: string;
  tipo: string;
  testeUser: boolean = false;
  
  constructor(private router: Router, private loginService: LoginService) { 

  }

  ngOnInit() {

   // var nome = document.getElementById("nome");
   // var email = document.getElementById("email");
   // var tel = document.getElementById("telefone");
  
   // if (Globals.USUARIO == undefined){
   //   this.router.navigate(['/login']);

   if (!localStorage.getItem("token")) {
    //alert("Você não pode acessar está página sem estar logado")
    this.router.navigate(['login']);

  }
  else {
  
   // alert("Logado")
    this.loginService.log.next(true); 
    this.usuario = Globals.USUARIO;
    this.vendedor = Globals.VENDEDOR;
    this.user = localStorage.getItem("nome");
    this.email = localStorage.getItem("usuarioEmail");
    this.tipo = localStorage.getItem("tipo");

    if(this.tipo == "Administrador"){
      this.testeUser = true;
    }
    
    



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
    location.reload();
    this.router.navigate(['login']);
  }
  

}
