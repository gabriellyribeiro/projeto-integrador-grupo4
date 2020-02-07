import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

  constructor(private elementRef: ElementRef,@Inject(DOCUMENT) private doc,private productService: ProductService) { }

  products: Product[];

  ngOnInit() {

    this.findAll();

    // var s1 = document.createElement("script");
    // s1.type = "text/javascript";
    // s1.src = "../assets/javascript/global.js";
    // this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "../assets/javascript/bootstrap/js/bootstrap.min.js";
    this.elementRef.nativeElement.appendChild(s2);

    var s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = "../assets/javascript/template_js/jstree.min.js";
    this.elementRef.nativeElement.appendChild(s3);

    var s4 = document.createElement("script");
    s4.type = "text/javascript";
    s4.src = "../assets/javascript/template_js/template.js";
    this.elementRef.nativeElement.appendChild(s4);

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


    var s10 = document.createElement("script");
    s10.type = "text/javascript";
    s10.src = "../assets/javascript/jquery.parallax.js";
    this.elementRef.nativeElement.appendChild(s10);

    // var s11 = document.createElement("script");
    // s11.type = "text/javascript";
    // s11.src = "../assets/js/jQuery.js";
    // this.elementRef.nativeElement.appendChild(s11);




    // <link href="/assets/favicon.png" rel="icon" type="image/png" >
    // <link href="/assets/css/bootstrap.min.css" rel="stylesheet" media="screen" />
    // <link href="/assets/javascript/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
    // <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet"/>
    // <link href="/assets/css/stylesheet.css" rel="stylesheet">
    // <link href="./assets/css/responsive.css" rel="stylesheet">
    // <link href="/assets/javascript/owl-carousel/owl.carousel.css" type="text/css" rel="stylesheet" media="screen" />
    // <link href="/assets/javascript/owl-carousel/owl.transitions.css" type="text/css" rel="stylesheet" media="screen" />
    // <script type="text/javascript" src="/assets/javascript/jquery-2.1.1.min.js"></script>
    // <script type="text/javascript" src="/assets/javascript/bootstrap/js/bootstrap.min.js" ></script>
    // <script type="text/javascript" src="/assets/javascript/template_js/jstree.min.js"></script>
    // <script type="text/javascript" src="/assets/javascript/template_js/template.js"></script>
    // <script type="text/javascript" src="/assets/javascript/common.js" ></script>
    // <script type="text/javascript" src="/assets/javascript/global.js"></script>
    // <script type="text/javascript" src="/assets/javascript/owl-carousel/owl.carousel.min.js" ></script>

    
// <script type="text/javascript" src="./assets/js/jQuery.js"></script> 


// <script src="/assets/javascript/DioProgress.js"></script> 
// <script src="/assets/javascript/jquery.parallax.js"></script> 

  }

  findAll(){
    this.productService.getAll().subscribe((productOut: Product[]) =>{
      this.products = productOut;
     
    });
  }

}
