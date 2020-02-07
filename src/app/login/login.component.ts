
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../model/globals';
import { LoginService } from '../service/login.service';
import { Token } from '../model/token';
import { Vendedor } from '../model/vendedor';
import { VendedorService } from '../service/vendedor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Globals]
})
export class LoginComponent implements OnInit {

  login: Usuario = new Usuario(0, '', '', '', '', '', '', null);
  user: String;
  usuario: Usuario = new Usuario(0, '', '', '', '', '', '', null);

  loginVendedor: Vendedor = new Vendedor(0, '', '', '', '', '', '', null, null);

  vendedor: Vendedor = new Vendedor(0, "", "", "", "", "", "", null, null);

  constructor(private usuarioService: UsuarioService, private vendedorService: VendedorService, private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit() {

    if (!localStorage.getItem("token")) {
      // alert("Você não pode acessar está página sem estar logado")
      this.router.navigate(['login']);

    }
    else {
      this.user = localStorage.getItem("nome");
      //alert("Logado")
      this.loginService.log.next(true);
      //this.usuario = Globals.USUARIO;

      this.router.navigate(['user-page']);
    }



  }

  redirect() {

    var comum = (<HTMLInputElement>document.getElementById("novaContaComum")).checked;
    var vendedor = (<HTMLInputElement>document.getElementById("novaContaVendedor")).checked;

    if (comum) {
      this.router.navigate(['registrar']);

    } else if (vendedor) {
      this.router.navigate(['registrar-vendedor']);

    }

  }




  logar() {

    localStorage.clear();

    var a = document.getElementById("erro2");
    var senha = document.getElementById("erro1");
    var email = document.getElementById("erro3");

    if (this.usuario.email == '' && this.usuario.senha == '') {

      a.className = "alert alert-primary";

    } else if (this.usuario.senha == '') {

      senha.className = "alert alert-primary";
      a.className = "alert alert-primary hidden";
      email.className = "alert alert-primary hidden";
    } else if (this.usuario.email == '') {

      email.className = "alert alert-primary";
      a.className = "alert alert-primary hidden";
      senha.className = "alert alert-primary hidden";

    } else {
      a.className = "alert alert-primary hidden";
      senha.className = "alert alert-primary hidden";
      email.className = "alert alert-primary hidden";

      this.loginService.login(this.usuario).subscribe((res: Token) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("nome", res.nome);
        localStorage.setItem("email", res.email);
        localStorage.setItem("tipo", this.usuario.tipo);
        this.loginService.log.next(true);
        //this.router.navigate(['user-page']);
        console.log(this.usuario);
        alert(res.token);
      }, err => {
        // console.log(`Erro cod: ${err.status}`);
        // alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
        //this.router.navigate(['login']);
        this.vendedor.idVendedor = this.usuario.idUsuario;
        this.vendedor.nome = this.usuario.nome;
        this.vendedor.senha = this.usuario.senha;
        this.vendedor.email = this.usuario.email;
        this.vendedor.tipo = "Vendedor";
        


        this.loginService.loginVendedor(this.vendedor).subscribe((res: Token) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("nome", res.nome);
          localStorage.setItem("email", res.email);
          this.loginService.log.next(true);
         
          //this.router.navigate(['user-page']);
          alert(res.token);
        }, err => {
          console.log(`Erro cod: ${err.status}`);

        });



      });
      //this.router.navigate(['/user-page']);
      this.buscarUsuario();
      location.reload();




    }
  }


  buscarUsuario() {
    this.usuarioService.verificar(this.usuario).subscribe((usuario: Usuario) => {
      //this.usuario = await usuario;
      if(this.usuario.senha == "adm@" && this.usuario.email == "admin@admin"){
        this.usuario.tipo = "Administrador";
        var tipo = this.usuario.tipo;
      }else{
        this.usuario.tipo = "Comum";
        var tipo = this.usuario.tipo;
      }

      localStorage.setItem("usuario.nome", usuario.nome);
      localStorage.setItem("usuarioEmail", usuario.email);
      localStorage.setItem("usuario.telefone", usuario.telefone);
      

      localStorage.setItem("tipo", tipo);
      alert("Usuario existente");
      alert(this.usuario.tipo);
      Globals.USUARIO = usuario;
      //this.loginService.log.next(false);
      // this.router.navigate(['user-page']);
      
    }, err => {


      this.vendedor.idVendedor = this.usuario.idUsuario;
      this.vendedor.nome = this.usuario.nome;
      this.vendedor.senha = this.usuario.senha;
      this.vendedor.email = this.usuario.email;
      this.vendedor.tipo = "Vendedor";
      Globals.VENDEDOR = this.vendedor;
     

      this.vendedorService.verificar(this.vendedor).subscribe((vendedor: Vendedor) => {
        localStorage.setItem("usuario.nome", vendedor.nome);
        localStorage.setItem("usuarioEmail", vendedor.email);
        localStorage.setItem("usuario.telefone", vendedor.telefone);
        this.vendedor.tipo = "Vendedor";
        var tipo = this.vendedor.tipo;
        localStorage.setItem("tipo", tipo);

        alert("Usuario existente");
        alert(this.vendedor.tipo);
        //Globals.USUARIO = usuario;
      }, err => {
        console.log(`Erro cod: ${err.status}`);
      });
      //console.log(`Erro cod: ${err.status}`);
      //alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
      //this.router.navigate(['login']);


    });
  }


  verifica() {
    var a = document.getElementById("erro2");
    var senha = document.getElementById("erro1");
    var email = document.getElementById("erro3");

    if (this.usuario.email == '' && this.usuario.senha == '') {

      a.className = "alert alert-primary";

    } else if (this.usuario.senha == '') {

      senha.className = "alert alert-primary";
      a.className = "alert alert-primary hidden";
      email.className = "alert alert-primary hidden";
    } else if (this.usuario.email == '') {

      email.className = "alert alert-primary";
      a.className = "alert alert-primary hidden";
      senha.className = "alert alert-primary hidden";

    } else {
      a.className = "alert alert-primary hidden";
      senha.className = "alert alert-primary hidden";
      email.className = "alert alert-primary hidden";
      this.usuarioService.verificar(this.usuario).subscribe((usuario: Usuario) => {
        this.usuario = usuario;

        alert("Usuario existente");
        Globals.USUARIO = usuario;
        this.router.navigate(['user-page']);
      }, err => {
        //console.log(`Erro cod: ${err.status}`);
        //alert(`Email: ${this.usuario.email} , não encontrado :${err.status}`);
        //this.router.navigate(['login']);
        this.vendedorService.verificar(this.vendedor).subscribe((vendedor: Vendedor) => {
          this.vendedor = vendedor;
        }, err => {
          console.log(`Erro cod: ${err.status}`);
        });
      });
    }
  }

}
