import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PromocaoComponent } from './promocao/promocao.component';
import { MaisvendidosComponent } from './maisvendidos/maisvendidos.component';
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
import { ProdutoSingleComponent } from './produto-single/produto-single.component';
import { CategoriaNovoComponent } from './categoria-novo/categoria-novo.component';
import { CategoriaListarComponent } from './categoria-listar/categoria-listar.component';
import { CategoriaDeleteComponent } from './categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './produto-delete/produto-delete.component';
import { VendedorListarComponent } from './vendedor-listar/vendedor-listar.component';
import { VendedorNovoComponent } from './vendedor-novo/vendedor-novo.component';
import { VendedorDeletarComponent } from './vendedor-deletar/vendedor-deletar.component';
import { VendedorPageComponent } from './vendedor-page/vendedor-page.component';
import { RegistrarVendedorComponent } from './registrar-vendedor/registrar-vendedor.component';



const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: '#' , component: HomeComponent},
  {path: '' , component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contato', component: ContatoComponent},
  {path: 'promocao' , component: PromocaoComponent},
  {path: 'maisvendidos' , component: MaisvendidosComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'registrar-vendedor', component: RegistrarVendedorComponent},
  {path: 'colecao', component : ColecaoComponent},
  {path: 'usuario-listar', component: UsuarioListarComponent},
  {path: 'usuario-novo/:id', component: UsuarioNovoComponent},
  {path: 'usuario-deletar/:id', component: UsuarioDeletarComponent},
  {path: 'user-page', component: UserPageComponent},
  {path: 'perguntas', component:PerguntasComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'produto-novo/:id', component: ProdutoNovoComponent},
  {path: 'produto-novo', component: ProdutoNovoComponent},
  {path: 'produto-single', component: ProdutoSingleComponent},
  {path: 'produto-single/:id', component: ProdutoSingleComponent},
  {path: 'produto-delete/:id', component: ProdutoDeleteComponent},
  {path: 'categoria-novo/:id', component: CategoriaNovoComponent},
  {path: 'categoria-novo', component: CategoriaNovoComponent},
  {path: 'categoria-deletar/:id', component: CategoriaDeleteComponent},
  {path: 'categoria-listar', component: CategoriaListarComponent},
  {path: 'vendedor-listar', component: VendedorListarComponent},
  {path: 'vendedor-novo/:id', component: VendedorNovoComponent},
  {path: 'vendedor-novo', component: VendedorNovoComponent},
  {path: 'vendedor-deletar/:id', component: VendedorDeletarComponent},
  {path: 'vendedor-page', component: VendedorPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
