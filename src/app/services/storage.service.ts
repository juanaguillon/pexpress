import { Injectable } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn:'root'
})

export class StorageService{

  constructor(
    private storage:AngularFireStorage
  ){}
  
  deleteImageByUrl( url:string){
    let image = this.storage.storage.refFromURL( url );
    return {
      name: image.name,
      delete:function(){return image.delete()}
    }
  }
}