import { Component, OnInit } from '@angular/core';
import { Globals } from '../model/globals';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Vendedor } from '../model/vendedor';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';


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
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  products: Product[];
  
  constructor(private productservice: ProductService, private router: Router, private loginService: LoginService, private productService: ProductService) { 

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
    
    



   // this.router.navigate(['user-page']);
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
  
  findAll(){
    this.productService.getAll().subscribe((productOut: Product[]) =>{
      this.products = productOut;
     
      //console.log(this.products);
    });
  }

}
