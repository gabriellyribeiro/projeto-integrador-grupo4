import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../model/vendedor';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedorService } from '../service/vendedor.service';

@Component({
  selector: 'app-vendedor-novo',
  templateUrl: './vendedor-novo.component.html',
  styleUrls: ['./vendedor-novo.component.css']
})
export class VendedorNovoComponent implements OnInit {

  valido: boolean = false;
  novo: boolean = false;

  vendedor: Vendedor = new Vendedor(0,'','','','','',null,null);
  constructor(private route: ActivatedRoute, private vendedorService:VendedorService, private router: Router) { }

  ngOnInit() {

    let id:number = this.route.snapshot.params["id"];

    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;
    }
  }

  findById(id: number){
    this.vendedorService.getById(id).subscribe((vendedor: Vendedor) =>{
     this.vendedor = vendedor; 
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  validateEmail() {
    var emailValue = this.vendedor.email;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(emailValue));

    var erroEmailValid = document.getElementById("emailValidError");

    if(re.test(emailValue)){
 
      erroEmailValid.className = "alert alert-primary hidden";
      this.valido = true;
      
    }else{
      erroEmailValid.className = "alert alert-primary ";
      this.valido = false;

    }
  }


  salvar(){
    
  
    var nome = document.getElementById("erroNome");
    var email = document.getElementById("erroEmail");
    var telefone = document.getElementById("erroTelefone");


    if(this.vendedor.nome == null || this.vendedor.nome == ""){
      nome.className = "alert alert-primary";
      this.valido = false;
    }else{
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.email == null || this.vendedor.email == ""){
      email.className = "alert alert-primary";
      this.valido = false;
    }else{
      email.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.telefone == null || this.vendedor.telefone == ""){
      telefone.className = "alert alert-primary";
      this.valido = false;
    }else{
      telefone.className = "alert alert-primary hidden";
      this.valido = true;
    }

    this.validateEmail();

    if(this.vendedor.nome == null || this.vendedor.nome == "" ||this.vendedor.email == null || this.vendedor.email == ""|| this.vendedor.telefone == null || this.vendedor.telefone == "" ){
      this.valido = false;
    }

    this.vendedor.compra = null;
    this.vendedor.produto = null;
  
    
    


    if(this.novo && this.valido){
      this.vendedorService.insert(this.vendedor).subscribe((vendedor: Vendedor) =>{
        this.vendedor = vendedor;
        this.novo = false;
        alert("Dado inserido com sucesso!");
       this.router.navigate(['vendedor-listar']);
      });
    } else {
      if(this.valido){
      this.vendedorService.update(this.vendedor).subscribe((vendedor: Vendedor) =>{
        this.vendedor = vendedor;
        alert("Alterado com sucesso");
       this.router.navigate(['vendedor-listar']);
      });
    }
  }


  }

}
