import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { ActivatedRoute, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { UsuarioService } from './../service/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  novo: boolean = false;
  valido: boolean = false;
  usuario: Usuario = new Usuario(0,'','','','','');

  title = 'teste';
  angForm: FormGroup;
   constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private usuarioService:UsuarioService) {
    

    this.createForm();
  } 
  public frmSignup: FormGroup;


createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.required ],
       address: ['', Validators.required ],
       teste: ['', Validators.required ],
       telefone: ['', Validators.required ],
       email: ['', Validators.required],
       senha: ['', Validators.compose([
         Validators.required,
         CustomValidators.patternValidator(/\d/, { hasNumber: true }),
         CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
         CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
         Validators.minLength(8)
       ]
       ) ],
       confirmar: ['', Validators.compose([Validators.required]) ]
      },
    {
     // validator: CustomValidators.passwordMatchValidator
      });
  }

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
      this.usuarioService.getById(id).subscribe((usuario: Usuario) =>{
       this.usuario = usuario; 
      }, err => {
        console.log(`Erro cod: ${err.status}`);
      });
    }

    redirect(){
      this.router.navigate(['login']);
    }

    verificar(){

      var nome = document.getElementById("erroNome");
      var telefone = document.getElementById("erroTelefone");
      var email = document.getElementById("erroEmail");
      var senha = document.getElementById("erroSenha");
      var senha2 = document.getElementById("erroSenha2");
      var confirmarSenha = (<HTMLInputElement>document.getElementById("confirmarSenha")).value;
      var senha_1 = (<HTMLInputElement>document.getElementById("senha")).value;
      
      if(this.usuario.nome == null || this.usuario.nome == ""){
        nome.className = "alert alert-primary";
        this.valido = false;
      }else{
        nome.className = "alert alert-primary hidden";
        this.valido = true;
      }

      if(this.usuario.telefone == null || this.usuario.telefone == ""){
        telefone.className = "alert alert-primary";
        this.valido = false;
      }else{
        telefone.className = "alert alert-primary hidden";
        this.valido = true;
      }

      if(this.usuario.email == null || this.usuario.email == ""){
        email.className = "alert alert-primary";
        this.valido = false;
      }else{
        email.className = "alert alert-primary hidden";
        this.valido = true;
      }

      if(this.usuario.senha == null || this.usuario.senha == ""){
        senha.className = "alert alert-primary";
        this.valido = false;
      }else{
        senha.className = "alert alert-primary hidden";
        this.valido = true;
      }

      if(senha_1 != confirmarSenha){
        senha2.className = "alert alert-primary";
        console.log("Senha");
        this.valido = false;
      }else{
        senha2.className = "alert alert-primary hidden";
        this.valido = true;
      }

      this.validateEmail();

      if(this.usuario.nome == null || this.usuario.nome == "" || this.usuario.telefone == null || this.usuario.telefone == "" || this.usuario.email == null || this.usuario.email == "" ||this.usuario.senha == null || this.usuario.senha == "" || confirmarSenha != senha_1){
        this.valido = false;
      }else{

      }


      return this.valido;
    }

    validateEmail() {
      var emailValue = (<HTMLInputElement>document.getElementById("email")).value;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(re.test(emailValue));
      var erroEmailValid = document.getElementById("erroEmailValid");

      if(re.test(emailValue)){
   
        erroEmailValid.className = "alert alert-primary hidden";
        this.valido = true;
      }else{
        erroEmailValid.className = "alert alert-primary ";
        this.valido = false;

      }
    }

    verificarSenha(){
      var confirmarSenha = (<HTMLInputElement>document.getElementById("confirmarSenha")).value;
      var senha_1 = (<HTMLInputElement>document.getElementById("senha")).value;
      var erroSenha = document.getElementById("erroSenhaC");

      if(senha_1.indexOf("@") == -1){
          erroSenha.className = "alert alert-primary";
          this.valido = false;
      }else{
        erroSenha.className = "alert alert-primary hidden";
      }
      return this.valido
    }

    
    salvar(){

      

      this.verificar();
     


      if(this.novo && this.valido){
        this.usuarioService.insert(this.usuario).subscribe((usuario: Usuario) =>{
          this.usuario = usuario;
          this.novo = false;
          alert("Usuário "+ usuario.nome + " salvo com sucesso!")
          this.redirect()
          
        });
      } else {

        if(this.valido){
        this.usuarioService.update(this.usuario).subscribe((usuario: Usuario) =>{
          this.usuario = usuario;
          alert("ERRO"+ usuario.nome + " já existente!")
        });
      }
      
    }
    }
   
  }

