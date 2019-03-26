import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private fdb: AngularFirestore, private stg: AngularFireStorage, ) {}

  public createProduct( data:Product, image ){
    var idUnique = new Date().getTime();

    this.stg.upload("productos/" + idUnique, image ).then( check => {

      data.id = idUnique;
      data.image = idUnique.toString();
      this.fdb.doc("productos/" + idUnique ).set( data )
        .then( resp => {
          alert('Producto creado correctamente')
      })
        .catch( err => {
          alert('Error al crear el nuevo producto, intente nuevamente.');
          console.log( err );
      })
    } )
    


  }


  getAllProducts(  ){

    return this.fdb.collection('productos').snapshotChanges();
  }

  getProductById( $id ){
    return this.fdb.doc("productos/" + $id ).valueChanges();
  }

  getImageById( id ){
    return this.stg.ref( 'productos/' + id ).getDownloadURL();    
  }

  updateProductById( productID, newData ){
    this.fdb.doc("productos/" + productID ).update( newData )
      .then( rsp => {
        alert('Producto actualizado con éxito');
      } )
      .catch( error => { alert('Error al actualizar el producto'); console.log( error ); })
  }


}
