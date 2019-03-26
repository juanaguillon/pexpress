import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  products = []
  constructor( private product:ProductService ) {
    this.product.getAllProducts( ).pipe(

      map( product => {
        return product.map( product  => {
          return product.payload.doc.data();
        })
      } )
      
    )
    .subscribe( products => {
      this.products = products;
    } );
  }

  ngOnInit() {
  }

  

}
