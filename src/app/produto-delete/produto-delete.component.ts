import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';
import { Usuario } from '../model/usuario';
import { Vendedor } from '../model/vendedor';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;

  usuario: Usuario;
  vendedor: Vendedor;
  
  novo: boolean = false;
  valido: boolean = false;

  produto: Product = new Product(0,'',0,"",0,null,null,null);
  categorias = []
  constructor(private produtoService: ProductService,private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

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
    this.produtoService.delete(this.produto.idProduto).subscribe((response:string)=>{
      this.router.navigate(['colecao']);
    }, err => {
      //console.log(err);
      this.router.navigate(['colecao']);
    });
  }
  

  findById(id: number){
    this.produtoService.getById(id).subscribe((produto: Product) =>{
     this.produto = produto; 
     
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  redirect(){
    this.router.navigate(['colecao']);
  }

}
