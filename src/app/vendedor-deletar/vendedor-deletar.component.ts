import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../model/vendedor';
import { VendedorService } from '../service/vendedor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendedor-deletar',
  templateUrl: './vendedor-deletar.component.html',
  styleUrls: ['./vendedor-deletar.component.css']
})
export class VendedorDeletarComponent implements OnInit {

  novo: boolean = false;
  valido: boolean = false;

  vendedor: Vendedor = new Vendedor(0,'','','','','',null,null);
  vendedoress = []
  constructor(private vendedorService: VendedorService,private route: ActivatedRoute, private router: Router) { }

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
    this.vendedorService.delete(this.vendedor.idVendedor).subscribe((response:string)=>{
      this.router.navigate(['vendedor-listar']);
    }, err => {
      //console.log(err);
      this.router.navigate(['vendedor-listar']);
    });
  }
  

  findById(id: number){
    this.vendedorService.getById(id).subscribe((vendedor: Vendedor) =>{
     this.vendedor = vendedor; 
     
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  redirect(){
    this.router.navigate(['vendedor-listar']);
  }

}
