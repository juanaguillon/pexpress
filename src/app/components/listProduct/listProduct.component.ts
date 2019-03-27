import { Component, OnInit } from '@angular/core';
import { map, switchMap, mergeMap, concatMap, tap, flatMap } from 'rxjs/operators/';
import { of, merge, forkJoin } from 'rxjs';
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
    
    // Obtener lista de datos.
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



    // Obtener datos de slider
    this.slide.getAllDocs( )
    .pipe(
      map( results => {
          return results.map( f => {
            return {
              id: f.payload.doc.get('id'),
              name: f.payload.doc.get('name')
            }
          } )
        }
      ),
      flatMap( result => {
        
        let mp = []
        result.forEach(element => {
          mp.push(this.slide.getImageById(element.id))           
        });

        return forkJoin(mp); 
        
      } )
     
    )     
    
    .subscribe( res => {
      this.images = res;
    });
  }

  ngOnInit() {
  }



  

}
