import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(
    private stg: AngularFireStorage,
    private db:AngularFirestore 
    ) { }

  getImageById(id) {
    return this.stg.ref('productos/' + id).getDownloadURL();
  }

  uploadImage( idImage, dataImage ){
    return this.stg.upload( 'productos/' + idImage , dataImage );
  }

  saveDocument( idDoc, dataData:any ){
    return this.db.doc('slide/' + idDoc ).set( dataData );
  }

  getAllDocs( ){
    return this.db.collection('slide').snapshotChanges();
  }



}
