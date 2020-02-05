import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {


  novo: boolean = false;
  valido: boolean = false;

  categoria: Categoria = new Categoria(0,'');
  categorias = []
  constructor(private categoriaService: CategoriaService,private route: ActivatedRoute, private router: Router) { }

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
