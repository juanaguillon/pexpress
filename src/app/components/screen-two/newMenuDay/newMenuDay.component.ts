import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
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
  @Input() data;
  
  adiciones:string[] = [];
  currentAdition = "";
  inValues: any = {}

  // Evitar la nueva creación de menu en caso de estar en actualización.
  currentID:number;
  
  subscribeObject:any;

  buttonSend:any;

  constructor() {
    
  }

  ngOnInit() { 

    this.setTypeOfButton('add');
    
    this.subscribeObject = this.searchInfo.subscribe( ( ) => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.aditions = this.adiciones;
      this.inValues.type = 'menuday';

      this.takeInfo.emit( this.inValues );
    })

  }

  

  ngOnDestroy(): void {
   this.subscribeObject.unsubscribe();    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if ( changes.data && changes.data.currentValue != undefined ){
      this.inValues = changes.data.currentValue;
      this.adiciones = changes.data.currentValue.aditions;

      this.currentID = parseInt(changes.data.currentValue.id)

    } else if (changes.data && changes.data.currentValue == undefined) {
      this.inValues = {};
      this.adiciones = [];

      this.currentID = null;

    }
  }

  /** -----------
   * ADICIONES
   * -----------
   */

  /** Agregar Adicion con click  */
  addAdition(  ){
    if ( !this.currentAdition ){
      alert('Agrega una adicion antes')
      return;
    }

    this.adiciones.push( this.currentAdition );
    this.currentAdition = "";

  }

  /** Agregar/Editar adición */

  addAditionWithEnter( e ){
    if (e.keyCode == 13 ){
      this.addAdition( );
    }
  }

  /** Eliminar adicion */
  removeAdition( i:number ){

    this.adiciones.splice(i, 1 );
    
  }
  
  /**
   * -------------------
   * EDICIONES
   * -----------------
   * Ediciones de las adiciones de menú
   */
  
  prepareToEdit(e){
    e.preventDefault()

    this.setTypeOfButton('edit');
    let i = e.target.getAttribute('data-index')
    this.buttonSend.index = i;
    this.currentAdition = this.adiciones[i];

  }

  sendAdition(e){
    e.preventDefault();

    let event = e.target.getAttribute('data-event');
    if ( event === "add"){
      this.addAdition()
      
    }else if ( event === "edit"){
      
      this.setAdition(e.target.getAttribute('data-index'))
      this.setTypeOfButton('add');
    }
    
  }

  private setAdition( i ){
    let ad = this.currentAdition;
    this.adiciones[i] = ad;
    this.currentAdition = "";
  }

  /** Modificar el botón principal, ya sea agregar o editar la adicion actual. */
  private setTypeOfButton(type:string){
    if ( type == "add" ){
      this.buttonSend = {
        text:'&#10010;',
        className: 'btn btn-success',
        action:"add"
      }
    }else if ( type == "edit"){
      this.buttonSend = {
        text: 'Editar',
        className: 'btn btn-primary',
        action: "edit"
      }
    }
  }
}
