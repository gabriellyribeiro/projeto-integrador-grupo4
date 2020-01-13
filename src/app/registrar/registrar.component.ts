import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  title = 'teste';
  angForm: FormGroup;
   constructor(private fb: FormBuilder) {
    

    this.createForm();
  } 
  public frmSignup: FormGroup;


createForm() {
    this.angForm = this.fb.group({
       name: ['', Validators.required ],
       address: ['', Validators.required ],
       teste: ['', Validators.required ],
       telefone: ['', Validators.required, Validators.maxLength(11) ],
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

   
  }

}
