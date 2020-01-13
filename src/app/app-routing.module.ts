import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ColecaoComponent } from './colecao/colecao.component';


const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'colecao', component : ColecaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
