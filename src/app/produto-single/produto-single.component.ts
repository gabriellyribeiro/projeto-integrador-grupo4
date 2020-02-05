import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-produto-single',
  templateUrl: './produto-single.component.html',
  styleUrls: ['./produto-single.component.css']
})
export class ProdutoSingleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  novo: boolean = false;
  product: Product = new Product(0,'',0.0,'',0,null,null,null);

  ngOnInit() {

    let id:number = this.route.snapshot.params["id"];
    
    
   
      this.findById(id);
      
      
     
    


  }

  async findById(id: number){
    this.productService.getById(id).subscribe(async (resProduct: Product) =>{
     this.product = await resProduct; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

}
