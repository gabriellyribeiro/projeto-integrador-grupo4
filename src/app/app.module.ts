import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContatoComponent } from './contato/contato.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ColecaoComponent } from './colecao/colecao.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsuarioListarComponent } from './usuario-listar/usuario-listar.component';
import { UsuarioNovoComponent } from './usuario-novo/usuario-novo.component';
import { UsuarioDeletarComponent } from './usuario-deletar/usuario-deletar.component';
import { ProdutoSingleComponent } from './produto-single/produto-single.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PerguntasComponent } from './perguntas/perguntas.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoNovoComponent } from './produto-novo/produto-novo.component';
import { PromocaoComponent } from './promocao/promocao.component';
import { MaisvendidosComponent } from './maisvendidos/maisvendidos.component';
import { CategoriaListarComponent } from './categoria-listar/categoria-listar.component';
import { CategoriaNovoComponent } from './categoria-novo/categoria-novo.component';
import { CategoriaDeleteComponent } from './categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './produto-delete/produto-delete.component';
import { VendedorPageComponent } from './vendedor-page/vendedor-page.component';
import { VendedorDeletarComponent } from './vendedor-deletar/vendedor-deletar.component';
import { VendedorListarComponent } from './vendedor-listar/vendedor-listar.component';
import { VendedorNovoComponent } from './vendedor-novo/vendedor-novo.component';
import { RegistrarVendedorComponent } from './registrar-vendedor/registrar-vendedor.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AboutUsComponent,
    ContatoComponent,
    RegistrarComponent,
    ColecaoComponent,
    UsuarioListarComponent,
    UsuarioNovoComponent,
    UsuarioDeletarComponent,
    ProdutoSingleComponent,
    UserPageComponent,
    PerguntasComponent,
    ProdutoComponent,
    ProdutoNovoComponent,
    PromocaoComponent,
    MaisvendidosComponent,
    CategoriaListarComponent,
    CategoriaNovoComponent,
    CategoriaDeleteComponent,
    ProdutoDeleteComponent,
    VendedorPageComponent,
    VendedorDeletarComponent,
    VendedorListarComponent,
    VendedorNovoComponent,
    RegistrarVendedorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


