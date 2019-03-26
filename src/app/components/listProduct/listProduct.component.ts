import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators/';
import { ProductService } from '../../services/product.service';
import { SlideService } from '../../services/slide.service';


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

  constructor( private prservice:ProductService,
    private slide: SlideService
    ) {

  	this.prservice.getAllProducts().pipe( 
  		map( action => {
  			return action.map( a => {   
          return { 
            id: a.payload.doc.id,
            data: a.payload.doc.data(),
          }
  			})
  		})
    )
    .subscribe( resp => {
      this.products = resp;  
    });

    this.slide.getAllDocs( )
    .pipe(
      map( doc => {
          return doc.map( docsInd => {
            console.log(docsInd )
          })

          
      })
     
    )     
    
    .subscribe( res => {
      console.log( res )
    });


    


  }

  ngOnInit() {
  }



  

}
