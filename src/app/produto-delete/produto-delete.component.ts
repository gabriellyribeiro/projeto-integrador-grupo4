import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {
  novo: boolean = false;
  valido: boolean = false;

  produto: Product = new Product(0,'',0,"",0,null,null,null);
  categorias = []
  constructor(private produtoService: ProductService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    
    let id:number = this.route.snapshot.params["id"];


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
