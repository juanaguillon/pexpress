import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service' 

export interface Adiciones {
  name: string
}

@Component({
  selector: 'app-newMenuDay',
  templateUrl: './newMenuDay.component.html',
  styleUrls: ['./newMenuDay.component.css']
})

export class NewMenuDayComponent implements OnInit {

  adiciones:string[] = [];
  currentAdition = "";
  inValues:any = { };
  statusVals = [
    "Guardar",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Guardado"
  ]
  status = 0;


  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() { }

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

  saveMenu( ){
    let lengt = Object.keys( this.inValues ).length 
    if ( lengt < 5 ){
      alert('Todos los campos son obligatorios')
      return false;
    }
    if ( this.status == 1 ) return false;
    
    this.inValues.id = new Date().getTime();
    this.inValues.aditions = this.adiciones;
    this.inValues.type = 'menuday';

    this.status = 1
    
    const promResolve = ( res ) => {
      alert('Menú guardado correctamente');
      this.status = 2;
      this.adiciones = []
      this.inValues ={};
    }
    const promError = ( error ) => {
      this.status = 0
      alert('Error al guardar el documento')
      console.log( error );
    }
    
    this.database.saveDocument('secondscreen', this.inValues).then( promResolve  ).catch( promError );
    

    
  }


  
}
