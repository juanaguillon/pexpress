import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private database:AngularFirestore ) { }

  /**
   * Guardar datos en una colección especifica de firestore.
   * En el parámetro data debe contener una propiedad id, esta se usará para referirse a el documento.
   * En caso de no ingresar esta propiedad, arrojará una alerta y no continuará.
   * 
   * @param collection Collección en donde será guardado.
   * @param data Datos que serán guardados el documento.
   * @return Promise | false
   */
  public saveDocument( collection:string, data:any ){

    if ( typeof data.id == undefined ){
      alert('Los datos debe tener una clave "id"');
      return;
    }

    return this.database.doc( `${collection}/${data.id}` ).set( data );
  }

  /**
   * Obtener los datos completos de una coleccion
   * @param collection Nombre de la colección
   * @return Observable
   */
  public getFullCollection( collection:string ){
    return this.database.collection( collection ).valueChanges();
  }
  

  public searcQueryInCollection( collection:string, fieldToSearch:string, search:string ){
    return this.database.collection(collection, ref => ref.where( fieldToSearch , '==' , search ) ).valueChanges();
  }

  public getDocById( collection:string, id:any){
    return this.database.doc(`${collection}/${id}`).valueChanges();
  }

  public deleteDocumentById(collection:string,id:number){
    return this.database.doc(`${collection}/${id}`).delete();
  }


}
