import { Product } from './../model/product';
import { ProductService } from './../service/product.service';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: String;
  username: string;
  log2: boolean;
  name: string;

  productLista: Product[];
  produto: Product = new Product(0,'',0,'',0,null,null,null);
  constructor(private elementRef: ElementRef,@Inject(DOCUMENT) private doc,private router: Router, private loginService: LoginService, private produtoService: ProductService) { }

  
  
    


  ngOnInit() {

    if (!localStorage.getItem("token")) {
      //alert("Você não pode acessar está página sem estar logado")
     // this.router.navigate(['login']);
     this.log2 = false;
  
    }
    else {
      this.user = localStorage.getItem("nome");
      //alert("Logado")
      this.loginService.log.next(true);
      this.log2 = true;
      
     // this.router.navigate(['user-page']);
    }

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "../assets/javascript/global.js";
    this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../assets/javascript/bootstrap/js/bootstrap.min.js";
    this.elementRef.nativeElement.appendChild(s2);

  //  var s3 = document.createElement("script");
   // s3.type = "text/javascript";
   // s3.src = "../assets/javascript/template_js/jstree.min.js";
    //this.elementRef.nativeElement.appendChild(s3);

   // var s4 = document.createElement("script");
   // s4.type = "text/javascript";
   // s4.src = "../assets/javascript/template_js/template.js";
   // this.elementRef.nativeElement.appendChild(s4);

    var s5 = document.createElement("script");
    s5.type = "text/javascript";
    s5.src = "../assets/javascript/common.js";
    this.elementRef.nativeElement.appendChild(s5);

    var s6 = document.createElement("script");
    s6.type = "text/javascript";
    s6.src = "../assets/javascript/global.js";
    this.elementRef.nativeElement.appendChild(s6);

    var s7 = document.createElement("script");
    s7.type = "text/javascript";
    s7.src = "../assets/javascript/owl-carousel/owl.carousel.min.js";
    this.elementRef.nativeElement.appendChild(s7);

    // var s8 = document.createElement("script");
    // s8.type = "text/javascript";
    // s8.src = "../assets/javascript/javascript/jquery-2.1.1.min.js";
    // this.elementRef.nativeElement.appendChild(s8);

    // var s9 = document.createElement("script");
    // s9.type = "text/javascript";
    // s9.src = "../assets/js/jQuery.js";
    // this.elementRef.nativeElement.appendChild(s9);

    var s10 = document.createElement("script");
    s10.type = "text/javascript";
    s10.src = "../assets/javascript/jquery.parallax.js";
    this.elementRef.nativeElement.appendChild(s10);

  }

  
  buscarProduto(){
    this.produtoService.getByName(this.name).subscribe((productsOut: Product)=>{
      this.produto = productsOut;
      console.log(this.produto);
      var value = this.produto.idProduto;
      this.router.navigate([`produto-single/${value}`]);
     
      
    })
  }
  

}
