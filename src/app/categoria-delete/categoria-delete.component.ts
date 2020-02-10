import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/categoria';
import { LoginService } from '../service/login.service';
import { Globals } from '../model/globals';
import { Usuario } from '../model/usuario';
import { Vendedor } from '../model/vendedor';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  usuario: Usuario;
  vendedor: Vendedor;
  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  
  novo: boolean = false;
  valido: boolean = false;

  categoria: Categoria = new Categoria(0,'');
  categorias = []
  constructor(private loginService: LoginService,private categoriaService: CategoriaService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let id:number = this.route.snapshot.params["id"];

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

    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;

      
    }
  }

  
  btnSim(){
    this.categoriaService.delete(this.categoria.idCategoria).subscribe((response:string)=>{
      this.router.navigate(['categoria-listar']);
    }, err => {
      //console.log(err);
      this.router.navigate(['categoria-listar']);
    });
  }
  

  findById(id: number){
    this.categoriaService.getById(id).subscribe((categoria: Categoria) =>{
     this.categoria = categoria; 
     
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  redirect(){
    this.router.navigate(['categoria-listar']);
  }

}
