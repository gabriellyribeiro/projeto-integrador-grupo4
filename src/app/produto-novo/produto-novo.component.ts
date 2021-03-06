import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/categoria';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';
import { Usuario } from '../model/usuario';
import { Vendedor } from '../model/vendedor';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html',
  styleUrls: ['./produto-novo.component.css']
})
export class ProdutoNovoComponent implements OnInit {

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
  categorias = [];
  categoria: Categoria = new Categoria(0,'');

  product: Product = new Product(0,'',0.0,'',0,null,null,null);

  constructor(private loginService: LoginService ,private route: ActivatedRoute, private productService: ProductService, private router: Router, private categoriaService: CategoriaService) { }

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
  
  findAllCategoria() {
    this.categoriaService.getAll().subscribe((categoriaOut: Categoria[]) => {
      this.categorias = categoriaOut;

      console.log(this.categorias);
    });
  }

   findCategoriaByNome(nome: string) {
    this.categoriaService.getByNome(nome).subscribe( (categoriaOut: Categoria) => {
      this.categoria =  categoriaOut;
      console.log(this.categoria);
    });

  }

  buscarCategoria(){
    var categoria = (<HTMLSelectElement>document.getElementById("categoria.produto"));
    var categoriaNome = categoria.options[categoria.selectedIndex].value;


    this.findCategoriaByNome(categoriaNome);
    
    
  }


   async findById(id: number){
    this.productService.getById(id).subscribe(async (resProduct: Product) =>{
     this.product = await resProduct; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }


  salvarProd(){

    var nome = document.getElementById("erroTitulo");
    var preco = document.getElementById("erroPreco");
    var descricao = document.getElementById("erroDescricao");
    var url = document.getElementById("erroUrl");

   
     

    if(this.product.nome == null || this.product.nome == ""){
      nome.className = "alert alert-primary";
      this.valido = false;
    }else{
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }
      
    if(this.product.preco == null || this.product.preco <= 0){
      preco.className = "alert alert-primary";
      this.valido = false;
    }else{
      preco.className = "alert alert-primary hidden";
      this.valido = true;
    }
      
    
    if(this.product.qtd == null || this.product.qtd == 0){
      descricao.className = "alert alert-primary";
      this.valido = false;
    }else{
      descricao.className = "alert alert-primary hidden";
      this.valido = true;
    }
     
      
    if(this.product.imgUrl == null || this.product.imgUrl == ""){
      url.className = "alert alert-primary";
      this.valido = false;
    }else{
      url.className = "alert alert-primary hidden";
      this.valido = true;
    }
     
    if(this.product.nome == null || this.product.nome == "" || this.product.preco == null || this.product.preco <= 0 || this.product.qtd == null || this.product.qtd == 0 || this.product.imgUrl == null || this.product.imgUrl == "" ){
      this.valido = false;
   }
    
    this.product.vendedor = null;
    this.product.categoria = null;
    this.product.compra = null;



    if(this.novo && this.valido){
      this.productService.insert(this.product).subscribe((product: Product) =>{
        this.product = product;
        this.novo = false;
        alert("Dado inserido com sucesso!");
        this.router.navigate(['colecao']);
      });
    } else {
      if(this.valido){
      this.productService.update(this.product).subscribe((product: Product) =>{
        this.product = product;
        this.product.categoria = null;
        this.product.compra = null;
        this.product.vendedor = null; 
        console.log(product);
        alert("Alterado com sucesso");
        this.router.navigate(['colecao']);
      });

    }else{

    }
    }
  }

}
