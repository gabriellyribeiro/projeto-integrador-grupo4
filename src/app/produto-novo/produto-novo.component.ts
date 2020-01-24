import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-produto-novo',
  templateUrl: './produto-novo.component.html',
  styleUrls: ['./produto-novo.component.css']
})
export class ProdutoNovoComponent implements OnInit {


  novo: boolean = false;

  product: Product = new Product(0,'',0.0,'','');

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {

    
    
    let id:number = this.route.snapshot.params["id"];

    console.log(id);

   

    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;
      
      
    }



  }


   async findById(id: number){
    this.productService.getById(id).subscribe(async (resProduct: Product) =>{
     this.product = await resProduct; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }


  salvarProd(){
    if(this.novo){
      this.productService.insert(this.product).subscribe((product: Product) =>{
        this.product = product;
        this.novo = false;
        alert("Dado inserido com sucesso!");
        this.router.navigate(['colecao']);
      });
    } else {
      this.productService.update(this.product).subscribe((product: Product) =>{
        this.product = product;
        console.log(product);
        alert("Alterado com sucesso");
        this.router.navigate(['colecao']);
      });
    }
  }

}
