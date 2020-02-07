import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../service/vendedor.service';
import { Vendedor } from '../model/vendedor';
import { Usuario } from '../model/usuario';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Globals } from '../model/globals';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-vendedor-listar',
  templateUrl: './vendedor-listar.component.html',
  styleUrls: ['./vendedor-listar.component.css']
})
export class VendedorListarComponent implements OnInit {

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
  
  
  
  constructor(private usuarioService: UsuarioService, private loginService: LoginService, private router: Router, private vendedorService: VendedorService) { }

  ngOnInit() {
    this.getAll();
    this.findAll();

    if (!localStorage.getItem("token") || this.tipo != "Administrador") {
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

  getAll(){
      this.vendedorService.getAll().subscribe((vendedorOut: Vendedor[])=>{
        this.vendedores = vendedorOut;
      }, err =>{
        console.log(`Erro cod: ${err.status}`);
      });
  }
  findAll(){
    this.usuarioService.getAll().subscribe((usuario: Usuario[])=>{
      this.usuarios = usuario;
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
    });
  }


}
