
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';
import { Token } from '../model/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ Globals ]
})
export class LoginComponent implements OnInit {

  login: Usuario = new Usuario(0,'','','','','');
  user: String;
  usuario: Usuario = new Usuario(0,'','','','','');
  

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute, private router:Router, private loginService: LoginService) { }

  ngOnInit() {

    if (!localStorage.getItem("token")) {
      alert("Você não pode acessar está página sem estar logado")
      this.router.navigate(['login']);
  
    }
    else {
      this.user = localStorage.getItem("nome");
      alert("Logado")
      this.loginService.log.next(true); 
      //this.usuario = Globals.USUARIO;
      
    this.router.navigate(['user-page']);
    }
   
   
   
  }


  

  logar(){

    localStorage.clear();

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
      
    this.loginService.login(this.usuario).subscribe((res: Token)=>{
      localStorage.setItem("token",res.token);
      localStorage.setItem("nome",res.nome);
      localStorage.setItem("email",res.email);
      this.loginService.log.next(true);
      //this.router.navigate(['user-page']);
      alert(res.token);
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
     // alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
      //this.router.navigate(['login']);
    });
      //this.router.navigate(['/user-page']);
      this.buscarUsuario();
 


   
  }
  }

   buscarUsuario(){
      this.usuarioService.verificar(this.usuario).subscribe( (usuario: Usuario)=>{
        //this.usuario = await usuario;
        localStorage.setItem("usuario.nome",usuario.nome);
        localStorage.setItem("usuarioEmail",usuario.email);
        localStorage.setItem("usuario.telefone",usuario.telefone);
        alert("Usuario existente");
        Globals.USUARIO = usuario;
        //this.loginService.log.next(false);
       this.router.navigate(['user-page']);
      }, err =>{
        console.log(`Erro cod: ${err.status}`);
        //alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
        //this.router.navigate(['login']);
      });
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
