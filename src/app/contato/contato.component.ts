import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private doc) { }

  ngOnInit() {

    


  }

}
