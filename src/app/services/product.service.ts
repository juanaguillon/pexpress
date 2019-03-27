import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private fdb: AngularFirestore ) {}

  public createProduct( data:Product ){
    var idUnique = new Date().getTime();

    data.id = idUnique;
    this.fdb.doc("productos/" + idUnique ).set( data )
      .then( resp => {
        alert('Producto creado correctamente')
      })
      .catch( err => {
        alert('Error al crear el nuevo producto, intente nuevamente.');
        console.log( err );
    })
  }


  getAllProducts(  ){

    return this.fdb.collection('productos').snapshotChanges();
  }

  getProductById( $id ){
    return this.fdb.doc("productos/" + $id ).valueChanges();
  }


  updateProductById( productID, newData ){
    this.fdb.doc("productos/" + productID ).update( newData )
      .then( rsp => {
        alert('Producto actualizado con éxito');
      } )
      .catch( error => { alert('Error al actualizar el producto'); console.log( error ); })
  }


}
