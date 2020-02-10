import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';
import { Vendedor } from '../model/vendedor';

@Component({
  selector: 'app-usuario-deletar',
  templateUrl: './usuario-deletar.component.html',
  styleUrls: ['./usuario-deletar.component.css']
})
export class UsuarioDeletarComponent implements OnInit {
  
  
  vendedor: Vendedor;
  
  user: string;
  email: string;
  tipo: string;
  testeAdmin: boolean = false;
  testeComum: boolean = false;
  testeVendedor: boolean = false;
  novo: boolean = false;
  valido: boolean = false;

  usuario: Usuario = new Usuario(0,'','','','','',null,null);
  usuarios = []

  constructor(private loginService: LoginService,private usuarioService: UsuarioService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    let id:number = this.route.snapshot.params["id"];

    
    if (!localStorage.getItem("token") || localStorage.getItem("tipo") != "Administrador") {
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

    if(id == undefined){
      this.novo = true;
    } else {
      this.findById(id);
      this.novo = false;

      
    }
  }

  btnSim(){
    this.usuarioService.delete(this.usuario.idUsuario).subscribe((response:string)=>{
      this.router.navigate(['usuario-listar']);
    }, err => {
      //console.log(err);
      this.router.navigate(['usuario-listar']);
    });
  }
  

  findById(id: number){
    this.usuarioService.getById(id).subscribe((usuario: Usuario) =>{
     this.usuario = usuario; 
     
    }, err => {
      console.log(`Erro cod: ${err.status}`);
    });
  }

  redirect(){
    this.router.navigate(['usuario-listar']);
  }
}
