import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendedor } from '../model/vendedor';
import { Product } from '../model/product';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.css']
})
export class UsuarioNovoComponent implements OnInit {

  vendedor: Vendedor;
  
  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  products: Product[];
  usuarios = []
  
  valido: boolean = false;
  novo: boolean = false;

  usuario: Usuario = new Usuario(0,'','','','','',null,null);
  
  

  constructor(private loginService: LoginService, private route: ActivatedRoute, private usuarioService:UsuarioService, private router: Router) { }

  ngOnInit() {
    this.findAll();
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
        this.testeAdmin = true;
        this.testeComum = false;
        this.testeVendedor = false;
      }
      if(this.tipo == "Comum"){
        this.testeComum = true;
        this.testeAdmin = false;
        this.testeVendedor = false;
      }
      if(this.tipo == "Vendedor"){
        this.testeVendedor = true;
        this.testeAdmin = false;
        this.testeComum = false;
      }
      }

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


  validateEmail() {
    var emailValue = this.usuario.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(emailValue));

    var erroEmailValid = document.getElementById("emailValidError");

    if(re.test(emailValue)){
 
      erroEmailValid.className = "alert alert-primary hidden";
      this.valido = true;
      
    }else{
      erroEmailValid.className = "alert alert-primary ";
      this.valido = false;

    }
  }


  salvar(){
    
  
    var nome = document.getElementById("erroNome");
    var email = document.getElementById("erroEmail");
    var telefone = document.getElementById("erroTelefone");


    if(this.usuario.nome == null || this.usuario.nome == ""){
      nome.className = "alert alert-primary";
      this.valido = false;
    }else{
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.usuario.email == null || this.usuario.email == ""){
      email.className = "alert alert-primary";
      this.valido = false;
    }else{
      email.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.usuario.telefone == null || this.usuario.telefone == ""){
      telefone.className = "alert alert-primary";
      this.valido = false;
    }else{
      telefone.className = "alert alert-primary hidden";
      this.valido = true;
    }

    this.validateEmail();

    if(this.usuario.nome == null || this.usuario.nome == "" ||this.usuario.email == null || this.usuario.email == ""|| this.usuario.telefone == null || this.usuario.telefone == "" ){
      this.valido = false;
    }


    
    


    if(this.novo && this.valido){
      this.usuarioService.insert(this.usuario).subscribe((usuario: Usuario) =>{
        this.usuario = usuario;
        this.novo = false;
        alert("Dado inserido com sucesso!");
       this.router.navigate(['usuario-listar']);
      });
    } else {
      if(this.valido){
      this.usuarioService.update(this.usuario).subscribe((usuario: Usuario) =>{
        this.usuario = usuario;
        alert("Alterado com sucesso");
       this.router.navigate(['usuario-listar']);
      });
    }
  }


  }
  findAll(){
    this.usuarioService.getAll().subscribe((usuario: Usuario[])=>{
      this.usuarios = usuario;
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
    });
  }
}
