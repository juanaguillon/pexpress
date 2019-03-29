import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private database:AngularFirestore ) { }

  saveDocument( collection:string, data:any ){
    if ( typeof data.id == undefined ){
      alert('Los datos debe tener una clave "id"');
    }
    return this.database.doc( `${collection}/${data.id}` ).set( data );
  }

}
