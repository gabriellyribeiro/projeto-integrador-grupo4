import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Usuario } from '../model/usuario';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { UsuarioService } from './../service/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  novo: boolean = false;

  usuario: Usuario = new Usuario(0,'','','','');

  title = 'teste';
  angForm: FormGroup;
   constructor(private fb: FormBuilder, private route: ActivatedRoute, private usuarioService:UsuarioService) {
    

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

    salvar(){
      if(this.novo){
        this.usuarioService.insert(this.usuario).subscribe((usuario: Usuario) =>{
          this.usuario = usuario;
          this.novo = false;
          alert("Usuário "+ usuario.nome + " salvo com sucesso!")
        });
      } else {
        this.usuarioService.update(this.usuario).subscribe((usuario: Usuario) =>{
          this.usuario = usuario;
          alert("ERRO"+ usuario.nome + " já existente!")
        });
      }
    }
   
  }

