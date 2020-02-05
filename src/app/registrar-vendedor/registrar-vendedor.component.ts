import { Component, OnInit } from '@angular/core';
import { Vendedor } from '../model/vendedor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendedorService } from '../service/vendedor.service';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-registrar-vendedor',
  templateUrl: './registrar-vendedor.component.html',
  styleUrls: ['./registrar-vendedor.component.css']
})
export class RegistrarVendedorComponent implements OnInit {
  novo: boolean = false;
  valido: boolean = false;
  vendedor: Vendedor = new Vendedor(0,'','','','','','',null,null);

  title = 'teste';
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private vendedorService:VendedorService) { 
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
    this.vendedorService.getById(id).subscribe((vendedor: Vendedor) =>{
     this.vendedor = vendedor; 
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
    
    if(this.vendedor.nome == null || this.vendedor.nome == ""){
      nome.className = "alert alert-primary";
      this.valido = false;
    }else{
      nome.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.telefone == null || this.vendedor.telefone == ""){
      telefone.className = "alert alert-primary";
      this.valido = false;
    }else{
      telefone.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.email == null || this.vendedor.email == ""){
      email.className = "alert alert-primary";
      this.valido = false;
    }else{
      email.className = "alert alert-primary hidden";
      this.valido = true;
    }

    if(this.vendedor.senha == null || this.vendedor.senha == ""){
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

    if(this.vendedor.nome == null || this.vendedor.nome == "" || this.vendedor.telefone == null || this.vendedor.telefone == "" || this.vendedor.email == null || this.vendedor.email == "" ||this.vendedor.senha == null || this.vendedor.senha == "" || confirmarSenha != senha_1){
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

     this.vendedor.compra = null;
     this.vendedor.produto = null;

    this.verificar();
  


    if(this.novo && this.valido){
      this.vendedorService.insert(this.vendedor).subscribe((vendedor: Vendedor) =>{
        this.vendedor = vendedor;
        this.vendedor.tipo = "Vendedor";
        this.novo = false;
        alert("Usuário "+ vendedor.nome + " salvo com sucesso!")
        this.redirect()
        
      });
    } else {

      if(this.valido){
      this.vendedorService.update(this.vendedor).subscribe((vendedor: Vendedor) =>{
        this.vendedor = vendedor;
        alert("ERRO"+ vendedor.nome + " já existente!")
      });
    }
    
  }
  }




}
