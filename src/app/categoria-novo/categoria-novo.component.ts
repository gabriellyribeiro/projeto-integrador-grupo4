import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from '../model/categoria';
import { Usuario } from '../model/usuario';
import { Vendedor } from '../model/vendedor';
import { Product } from '../model/product';
import { LoginService } from '../service/login.service';
import { Globals } from '../model/globals';

@Component({
  selector: 'app-categoria-novo',
  templateUrl: './categoria-novo.component.html',
  styleUrls: ['./categoria-novo.component.css']
})
export class CategoriaNovoComponent implements OnInit {
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

  novo: boolean = false;
  valido: boolean = false;
  categoria: Categoria = new  Categoria(0,"");
  constructor(private loginService: LoginService,private route: ActivatedRoute, private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {


    let id:number = this.route.snapshot.params["id"];

    console.log(id);

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

  async findById(id: number){
    this.categoriaService.getById(id).subscribe(async (categoriaOut: Categoria) =>{
     this.categoria = await categoriaOut; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }


  salvar(){

    var nome = document.getElementById("erroTitulo");


   
     

    if(this.categoria.nome == null || this.categoria.nome == ""){
      nome.className = "alert alert-primary";
      this.valido = false;
    }else{
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }
      
 



    if(this.novo && this.valido){
      this.categoriaService.insert(this.categoria).subscribe((categoria: Categoria) =>{
        this.categoria = categoria;
        this.novo = false;
        alert("Dado inserido com sucesso!");
        this.router.navigate(['categoria-listar']);
      });
    } else {
      if(this.valido){
      this.categoriaService.update(this.categoria).subscribe((categoria: Categoria) =>{
        this.categoria = categoria;
        console.log(categoria);
        alert("Alterado com sucesso");
        this.router.navigate(['categoria-listar']);
      });

    }else{

    }
    }
  }

  }

