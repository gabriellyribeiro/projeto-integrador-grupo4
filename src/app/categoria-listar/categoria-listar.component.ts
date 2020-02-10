import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/categoria';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { Globals } from '../model/globals';
import { Usuario } from '../model/usuario';
import { Vendedor } from '../model/vendedor';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {
  usuario: Usuario;
  vendedor: Vendedor;
  
  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  products: Product[];
  usuarios = []

  vendedores = [];
  categorias = []
  constructor(private router: Router, private loginService: LoginService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.findAll();
   
    if (!localStorage.getItem("token") || localStorage.getItem("tipo") != "Administrador") {
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
  }

  findAll(){
    this.categoriaService.getAll().subscribe(async(categoriaOut: Categoria[])=>{
      this.categorias = categoriaOut;
      
    }, err =>{
        console.log(`Erro cod: ${err.status}`);
    });
  }

}
