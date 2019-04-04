import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

export interface Adiciones {
  name: string
}

@Component({
  selector: 'app-newMenuDay',
  templateUrl: './newMenuDay.component.html',
  styleUrls: ['./newMenuDay.component.css']
})

export class NewMenuDayComponent implements OnInit {

  @Output() takeInfo = new EventEmitter;
  @Input() searchInfo: Observable<any>;
  @Input() inValues;
  
  adiciones:string[] = [];
  currentAdition = "";
  // inValues: any = {}
  
  subscribeObject:any;

  constructor() {
    
  }

  ngOnInit() { 
    this.subscribeObject = this.searchInfo.subscribe( ( ) => {
      this.inValues.id = new Date().getTime();
      this.inValues.aditions = this.adiciones;
      this.inValues.type = 'menuday';

      this.takeInfo.emit( this.inValues );
    })

  }

  

  ngOnDestroy(): void {
  this.subscribeObject.unsubscribe();    
  }

  addAdition(  ){
    if ( !this.currentAdition ){
      alert('Agrega una adicion antes')
      return;
    }

    this.adiciones.push( this.currentAdition );
    this.currentAdition = "";

  }

  addAditionWithEnter( e ){
    if (e.keyCode == 13 ){
      this.addAdition( );
    }
  }

  // saveMenu( ){
  //   let lengt = Object.keys( this.inValues ).length 
  //   if ( lengt < 5 ){
  //     alert('Todos los campos son obligatorios')
  //     return false;
  //   }
  //   if ( this.status == 1 ) return false;
    
  //   this.inValues.id = new Date().getTime();
  //   this.inValues.aditions = this.adiciones;
  //   this.inValues.type = 'menuday';

  //   this.status = 1
    
  //   const promResolve = ( res ) => {
  //     alert('Menú guardado correctamente');
  //     this.status = 2;
  //     this.adiciones = []
  //     this.inValues ={};
  //   }
  //   const promError = ( error ) => {
  //     this.status = 0
  //     alert('Error al guardar el documento')
  //     console.log( error );
  //   }
    
  //   this.database.saveDocument('secondscreen', this.inValues).then( promResolve  ).catch( promError );
    

    
  // }


  
}
