import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../model/vendedor';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedorService } from '../service/vendedor.service';
import { Usuario } from '../model/usuario';
import { Product } from '../model/product';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-vendedor-novo',
  templateUrl: './vendedor-novo.component.html',
  styleUrls: ['./vendedor-novo.component.css']
})
export class VendedorNovoComponent implements OnInit {
  usuario: Usuario;
  
  
  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  products: Product[];
  usuarios = []

  vendedores = [];

  valido: boolean = false;
  novo: boolean = false;

  vendedor: Vendedor = new Vendedor(0,'','','','','',null,null,null);
  usuarioService: any;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private vendedorService:VendedorService, private router: Router) { }

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
    this.vendedorService.getById(id).subscribe((vendedor: Vendedor) =>{
     this.vendedor = vendedor; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  validateEmail() {
    var emailValue = this.vendedor.email;
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


    if(this.vendedor.nome == null || this.vendedor.nome == ""){
      nome.className = "alert alert-primary";
      this.valido = false;
    }else{
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.email == null || this.vendedor.email == ""){
      email.className = "alert alert-primary";
      this.valido = false;
    }else{
      email.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.telefone == null || this.vendedor.telefone == ""){
      telefone.className = "alert alert-primary";
      this.valido = false;
    }else{
      telefone.className = "alert alert-primary hidden";
      this.valido = true;
    }

    this.validateEmail();

    if(this.vendedor.nome == null || this.vendedor.nome == "" ||this.vendedor.email == null || this.vendedor.email == ""|| this.vendedor.telefone == null || this.vendedor.telefone == "" ){
      this.valido = false;
    }

    this.vendedor.compra = null;
    this.vendedor.produto = null;
  
    
    


    if(this.novo && this.valido){
      this.vendedorService.insert(this.vendedor).subscribe((vendedor: Vendedor) =>{
        this.vendedor = vendedor;
        this.novo = false;
        alert("Dado inserido com sucesso!");
       this.router.navigate(['vendedor-listar']);
      });
    } else {
      if(this.valido){
      this.vendedorService.update(this.vendedor).subscribe((vendedor: Vendedor) =>{
        this.vendedor = vendedor;
        alert("Alterado com sucesso");
       this.router.navigate(['vendedor-listar']);
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
