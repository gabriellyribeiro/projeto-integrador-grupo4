import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../model/vendedor';
import { VendedorService } from '../service/vendedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../model/usuario';
import { Product } from '../model/product';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-vendedor-deletar',
  templateUrl: './vendedor-deletar.component.html',
  styleUrls: ['./vendedor-deletar.component.css']
})
export class VendedorDeletarComponent implements OnInit {
  usuario: Usuario;
  
  
  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  products: Product[];
  usuarios = []

  vendedores = [];

  novo: boolean = false;
  valido: boolean = false;

  vendedor: Vendedor = new Vendedor(0,'','','','','',null,null,null);
  vendedoress = []
  constructor(private usuarioService: UsuarioService, private loginService: LoginService, private vendedorService: VendedorService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.findAll();
    
    let id:number = this.route.snapshot.params["id"];


    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;

      
    }

    if (!localStorage.getItem("token")|| localStorage.getItem("tipo") != "Administrador") {
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
  findAll(){
    this.usuarioService.getAll().subscribe((usuario: Usuario[])=>{
      this.usuarios = usuario;
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
    });
  }
}
