import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-registerProduct',
  templateUrl: './registerProduct.component.html',
  styleUrls: ['./registerProduct.component.css']
})
export class RegisterProductComponent implements OnInit {

  currentProduct: Product = {
    id: null,
    name: ""

  };  
  imageProduct = null;

  constructor( private productService:ProductService ) { }
  ngOnInit() {
  }

  uploadImage( $event ){

    this.imageProduct = $event.target.files[0];
    
  }

  uploadProduct( ){
    this.productService.createProduct( this.currentProduct );
  }
  

}
