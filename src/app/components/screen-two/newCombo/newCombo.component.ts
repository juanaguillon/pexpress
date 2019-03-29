import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-newCombo',
  templateUrl: './newCombo.component.html',
  styleUrls: ['./newCombo.component.css']
})
export class NewComboComponent implements OnInit {

  vals:any = {}
  inValues:any = {}
  theCombo:any[] = []
  statusVals = [
    "Guardar",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Guardado"
  ]
  status = 0;
  
  constructor(
    private database:DatabaseService
  ) { }

  ngOnInit() {}
  
  addCombo( ){
    let lengt = Object.keys( this.vals ).length;
    if ( lengt < 2 ){
      alert('Añade nombre y precio a el combo')
    }

    this.theCombo.push(this.vals )
    this.vals = {};
  }

  enteringCombo( e ){
    e.preventDefault();
    if ( e.keyCode == 13 ){
      this.addCombo ( );
    }
  }

  saveDocument( ){
    this.inValues.id = new Date().getTime();
    this.inValues.type = "combo";
    this.inValues.combos = this.theCombo;
    this.status = 1;
    const onProm = res => {
      alert('Combos guardados correctamente');
      this.status = 2;
    }

    const onError = error => {
      alert('Error al crear el combo')
      console.log( error );
    }
    
    
    let saved = this.database.saveDocument( 'secondscreen', this.inValues );
    saved.then( onProm );
    saved.catch ( err => console.log( err ) );
    
  }


}
