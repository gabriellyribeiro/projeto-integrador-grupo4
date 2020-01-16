
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  usuario: Usuario = new Usuario(0,'','','','');

  constructor(private usuarioService: UsuarioService,private route: ActivatedRoute) { }

  ngOnInit() {
  }

  verifica(){
    if(this.usuario.email == '' && this.usuario.senha == ''){
      alert("Preencha um dos campos para se logar");
    }else if(this.usuario.senha == ''){
      alert("O campo senha deve ser preenchido");
    }else if(this.usuario.email == ''){
      alert("O campo email deve ser preenchido");
          
    }else{

    this.usuarioService.verificar(this.usuario).subscribe((usuario: Usuario)=>{
      this.usuario = usuario;
   
      alert("Usuario existente");
    }, err =>{
      console.log(`Erro cod: ${err.status}`);
      alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
    });
  }
  }
}
