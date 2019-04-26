import { Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { map, flatMap } from 'rxjs/operators/';
import { of } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { SlideService } from '../../../services/slide.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-listProduct',
  templateUrl: './listProduct.component.html',
  styleUrls: ['./listProduct.component.css']
})
export class ListProductComponent implements OnInit {

  @ViewChild('slickModal') slickModal
	products:any[] = []; 
  images = [ ];
  slideOption = {
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
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
              name: f.payload.doc.get('name'),
              price: f.payload.doc.get('price')
            }
          } )
        }
      ),
      flatMap( result => {
        let mp = []
        result.forEach(element => {

          this.slide.getImageById(element.id).toPromise()
          .then( result =>{
            mp.push({
              image: result,
              title : element.name,
              price: element.price
            })  
          })        
                   
        }); 
        return of(mp);
      } )
     
    )     
    
    .subscribe( res => {
      this.images = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {   
    console.log( changes )
    this.slickModal.unslick()
    this.slickModal.slick( this.slideOption )
    
    
  }

  

  ngOnInit() {
  }

  slickInit( e ){
    console.log('Slick Init');
  }



  

}
