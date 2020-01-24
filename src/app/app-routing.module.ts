import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ColecaoComponent } from './colecao/colecao.component';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioNovoComponent } from './usuario-novo/usuario-novo.component';
import { UsuarioDeletarComponent } from './usuario-deletar/usuario-deletar.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PerguntasComponent } from './perguntas/perguntas.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoNovoComponent } from './produto-novo/produto-novo.component';


const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: '#' , component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'colecao', component : ColecaoComponent},
  {path: 'usuario-listar', component: UsuarioListarComponent},
  {path: 'usuario-novo/:id', component: UsuarioNovoComponent},
  {path: 'usuario-deletar/:id', component: UsuarioDeletarComponent},
  {path: 'user-page', component: UserPageComponent},
  {path: 'perguntas', component:PerguntasComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'produto-novo/:id', component: ProdutoNovoComponent},
  {path: 'produto-novo', component: ProdutoNovoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
