import { Component, OnInit } from '@angular/core';

import { map, switchMap, flatMap } from 'rxjs/operators/';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';




@Component({
  selector: 'app-listProduct',
  templateUrl: './listProduct.component.html',
  styleUrls: ['./listProduct.component.css']
})
export class ListProductComponent implements OnInit {

	products:any[] = []; 
  images = [ ];
  slideOption = {
    autoplay: true,
    autoplaySpeed: 700,
      loop:true,
      margin:0,
      nav:true,
      responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
      }
    }
  }

  constructor( private prservice:ProductService) {

  	var s = this.prservice.getAllProducts().pipe( 
  		map( action => {
  			return action.map( a => {   

          return { 
            id: a.payload.doc.id,
            data: a.payload.doc.data(),
            image: this.prservice.getImageById( a.payload.doc.id )
          }
  			})       

  		})

  	);

    s.subscribe( resp => {
      this.products = resp;      
    } )


  }

  ngOnInit() {
  }



  

}
