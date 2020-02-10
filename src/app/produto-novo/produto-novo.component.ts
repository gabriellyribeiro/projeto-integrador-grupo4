import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html',
  styleUrls: ['./produto-novo.component.css']
})
export class ProdutoNovoComponent implements OnInit {


  novo: boolean = false;
  valido: boolean = false;
  categorias = [];
  categoria: Categoria = new Categoria(0, '');
  nome: string;

  product: Product = new Product(0, '', 0.0, '', 0, null, null, null);

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private categoriaService: CategoriaService) { }

  ngOnInit() {



    let id: number = this.route.snapshot.params["id"];

    console.log(id);
    this.findAllCategoria();



    if (id == undefined) {
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;


    }



  }


  async findById(id: number) {
    this.productService.getById(id).subscribe(async (resProduct: Product) => {
      this.product = await resProduct;
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
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
      console.log("categoria prenchido "+ this.categoria);
    });

  }

  buscarCategoria(){
    var categoria = (<HTMLSelectElement>document.getElementById("categoria.produto"));
    var categoriaNome = categoria.options[categoria.selectedIndex].value;


    this.findCategoriaByNome(categoriaNome);
    console.log(this.categoria)
    
  }

  salvarProd() {

   

    

    var nome = document.getElementById("erroTitulo");
    var preco = document.getElementById("erroPreco");
    var descricao = document.getElementById("erroDescricao");
    var url = document.getElementById("erroUrl");




    if (this.product.nome == null || this.product.nome == "") {
      nome.className = "alert alert-primary";
      this.valido = false;
    } else {
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if (this.product.preco == null || this.product.preco <= 0) {
      preco.className = "alert alert-primary";
      this.valido = false;
    } else {
      preco.className = "alert alert-primary hidden";
      this.valido = true;
    }


    if (this.product.qtd == null || this.product.qtd == 0) {
      descricao.className = "alert alert-primary";
      this.valido = false;
    } else {
      descricao.className = "alert alert-primary hidden";
      this.valido = true;
    }


    if (this.product.imgUrl == null || this.product.imgUrl == "") {
      url.className = "alert alert-primary";
      this.valido = false;
    } else {
      url.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if (this.product.nome == null || this.product.nome == "" || this.product.preco == null || this.product.preco <= 0 || this.product.qtd == null || this.product.qtd == 0 || this.product.imgUrl == null || this.product.imgUrl == "") {
      this.valido = false;
    }




  
 

    this.product.compra = null;
    this.product.vendedor = null;
    this.product.categoria = this.categoria;
    console.log("produto prenchido"+this.product)


    if (this.novo && this.valido) {
      this.productService.insert(this.product).subscribe((product: Product) => {
 
        this.product = product;
       // this.product.categoria = this.categoria;
        this.novo = false;
        alert("Dado inserido com sucesso!");
        this.router.navigate(['colecao']);
      });
    } else {
      if (this.valido) {
        this.productService.update(this.product).subscribe((productOut: Product) => {
      
          this.product = productOut;
         
          console.log(this.product);
          alert("Alterado com sucesso");
          this.router.navigate(['colecao']);
        });

      } else {

      }
    }
  }

}
