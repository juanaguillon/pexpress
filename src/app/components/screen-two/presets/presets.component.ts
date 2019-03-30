import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

  currentTitle = "";
  menus = [];
  combos = [];
  ejecs = [];

  inVals:any = {}; 

  statusVals = [
    "Guardar Preset",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Preset Guardado"
  ]
  status = 0;
  
  constructor(
    private data: DatabaseService
  ) { 

    /* Obteniendo los menus del dia */
    this.data.searcQueryInCollection( 'secondscreen', 'type', 'menuday' ).subscribe( docs => {
      this.menus = docs;
    });

    /* Obteniendo los combos */
    this.data.searcQueryInCollection( 'secondscreen', 'type', 'combo' ).subscribe( docs => {
      this.combos = docs;
    });

    /* Obteniendos los menus ejecutivos */
    this.data.searcQueryInCollection( 'secondscreen', 'type', 'ejecutive' ).subscribe( docs => {
      this.ejecs = docs;
    });
    
  }

  ngOnInit() {}

  savePreset( e ){
    e.preventDefault();

    /* Evitar guardar dos veces el preset */
    if ( this.status == 1 ){
      return;
    }
    
    let obLength = Object.keys( this.inVals ).length; 
    if ( obLength < 3 ){
      alert('Selecciona todos los campos');
      return;
    }

    if ( this.currentTitle == "" ){
      alert('Añade un título a el preset');
      return;
    }

    if ( this.inVals.menu == "" ){
      alert('Debes seleccionar un menú');
      return;
    }else if( this.inVals.combo == "" ){
      alert('Debes seleccionar un combo');
      return;
    } else if ( this.inVals.ejec == "" ){
      alert('Debes seleccionar un menú ejecutivo');
      return;
    }

    this.status = 1;
    
    this.inVals.id = new Date().getTime();
    this.inVals.title = this.currentTitle;

    let saved = this.data.saveDocument( 'presets', this.inVals )

    saved.then( resp => {
      alert('Preset guardado correctamente');
      this.status = 2;
      this.currentTitle = "";
      setTimeout(() => {
        this.status = 0;
      }, 2000);
    });

    saved.catch( error => {
      alert( 'Error al guardar el preset');
      this.status = 0;
      console.log( error );
    })
    
    
  }

}
