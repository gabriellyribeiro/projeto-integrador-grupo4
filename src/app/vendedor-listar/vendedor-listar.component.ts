import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../service/vendedor.service';
import { Vendedor } from '../model/vendedor';

@Component({
  selector: 'app-vendedor-listar',
  templateUrl: './vendedor-listar.component.html',
  styleUrls: ['./vendedor-listar.component.css']
})
export class VendedorListarComponent implements OnInit {

  vendedores = [];
  constructor(private vendedorService: VendedorService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
      this.vendedorService.getAll().subscribe((vendedorOut: Vendedor[])=>{
        this.vendedores = vendedorOut;
      }, err =>{
        console.log(`Erro cod: ${err.status}`);
      });
  }



}
