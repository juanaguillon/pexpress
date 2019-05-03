import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore } from '@angular/fire/firestore'
import { take, map, flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

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
  
  saveDocument2( idDoc, dataData:any ){
    return this.db.doc('slide2/' + idDoc ).set( dataData );
  }

  getAllDocs( ){
    return this.db.collection('slide').snapshotChanges();
  }
  getAllDocs2( ){
    return this.db.collection('slide2').snapshotChanges();
  }

  getTheConfig( ){
    return this.db.collection('config').valueChanges( );
  }

  getPresetById( id:number ){
    return this.db.doc('presets/' + id ).get();
  }
  
  getSecondScreenDocById( id:number ){
    return this.db.doc(`secondscreen/${id}`).get();
  }

  updateConfig( ){
    let confg = this.getTheConfig().pipe(take(1)/* Retornar el observable en complete */).toPromise();

    confg.then( rs => {
      rs[0]['date'] = new Date().getTime();
      this.db.doc('config/actual_presets').set( rs[0] )
    })
   
  }

  getSliderTwoDocs(){
    // FlatMap Function
    const flatF = (result) => {
      let mp = []
      result.forEach(element => {
        mp.push(this.getImageById(element.id))
      });

      return forkJoin(mp);
    }

    // Map Fucntion
    const mapF = results => {
      return results.map(f => {
        return {
          id: f.payload.doc.get('id'),
          name: f.payload.doc.get('name')
        }
      })
    }

    const docs = this.getAllDocs2();
    return docs.pipe(map(mapF), flatMap(flatF))
  }
  deleteSlide1( id:number){
    this.stg.storage.ref('productos/' + id ).delete()
    .then( ref => {
      this.db.doc('slide/' + id ).delete( ).then( ref => {
        alert('Imágen eliminada correctamente');
      })
    })
  }

  deleteSlide2( id:number){
    this.stg.storage.ref('productos/' + id ).delete()
    .then( ref => {
      this.db.doc('slide2/' + id ).delete( ).then( ref => {
        alert('Imágen eliminada correctamente');
      })
    })
  }




}
