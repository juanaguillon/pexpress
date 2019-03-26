import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-updateProduct',
	styleUrls: ['./updateProduct.component.css'],
	templateUrl: './updateProduct.component.html'
})

export class UpdateProductComponent implements OnInit{
	currentProduct:any = {}
	currentID = null;
	constructor ( 
		private prService:ProductService,
		private activeRoute:ActivatedRoute
	){
		this.currentID = this.activeRoute.snapshot.params['id'];
		this.prService.getProductById( this.currentID )
			.subscribe( reps => {
				this.currentProduct = reps
			})

	}

	ngOnInit( ){

	}

	updateProduct( ){
		this.prService.updateProductById( this.currentID, this.currentProduct );
	}
}