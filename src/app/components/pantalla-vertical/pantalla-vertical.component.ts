import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-pantalla-vertical',
  templateUrl: './pantalla-vertical.component.html',
  styleUrls: ['./pantalla-vertical.component.css']
})
export class PantallaVerticalComponent implements OnInit {

  data = []
  data2 = []
  
  constructor() {
    this.data = [
      {
        title: 'Hamburguesa',
        image: 'assets/images/foto_1.jpg',
        price: 9000
      },
      {
        title: 'Churrasco',
        image: 'assets/images/foto_9.jpg',
        price: 17000
      },      
      {
        title: 'Costillas BBQ',
        image: 'assets/images/costillas2.jpg',
        price: 23000
      },
      {
        title: 'Mojarra',
        image: 'assets/images/foto_8.jpg',
        price: 24000
      },
      {
        title: 'Parrilla',
        image: 'assets/images/foto_7.jpg',
        price: 25000
      }
    ]   
    
  }


  ngOnInit(): void {
    
  }

  beforeChange(e){
    $(".slick-current .image_fully").removeClass("active");

  }

  afterChange(e){
    $(".slick-current .image_fully").addClass("active");
    
  }

  
  
}
