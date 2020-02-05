import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {

  categorias = []
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.findAll();
   
  }

  findAll(){
    this.categoriaService.getAll().subscribe(async(categoriaOut: Categoria[])=>{
      this.categorias = categoriaOut;
      
    }, err =>{
        console.log(`Erro cod: ${err.status}`);
    });
  }

}
