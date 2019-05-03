import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newCombo',
  templateUrl: './newCombo.component.html',
  styleUrls: ['./newCombo.component.css']
})
export class NewComboComponent implements OnInit {

  @Output() methodName = new EventEmitter<string>();
  @Input() events:Observable<void>;
  @Input() data;

  vals:any = {}
  inValues:any = {}
  theCombo:any[] = []

  currentID:number;

  /* Boton que se usará para editar o eliminar un combo, desde la lista de combos. */
  buttonSend:any;

  private eventSubs:any;

  constructor() { }

  ngOnInit() {
    this.eventSubs = this.events.subscribe( ( ) => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "combo";
      this.inValues.combos = this.theCombo;
      this.methodName.emit( this.inValues )
    } )

    this.setTypeOfButtonAdition('add');
  }

  ngOnDestroy(): void {
    this.eventSubs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes.data && changes.data.currentValue !== undefined){
      this.currentID = parseInt(changes.data.currentValue.id)
      this.theCombo = changes.data.currentValue['combos'];
    } else if (changes.data && changes.data.currentValue == undefined ){
      this.currentID = null;
      this.theCombo = [];
    }
  }

  /* Identifica si la acción se está modificando o agegando un nuevo combo. */
  eventButton(e) {
    e.preventDefault();
    let event = e.target.getAttribute('data-event');

    if ( event == 'add'){
      this.addCombo();
    }else if ( event == 'edit'){
      let i = e.target.getAttribute('data-index');
      this.setEditAdition( i );
      this.setTypeOfButtonAdition( "add" )
    }
  }

  addCombo( ){
    let lengt = Object.keys( this.vals ).length;
    if ( lengt < 2 ){
      alert('Añade nombre y precio a el combo')
      return;
    }

    this.theCombo.push(this.vals )
    this.vals = {};
  }

  /** Agregar un combo por medio de la tecla enter. */
  /** Es posible agregar un nuevo combo con oprimir la tecla 'enter' mientras se edita / crea un combo */
  enteringCombo( e ){
    e.preventDefault();
    if ( e.keyCode == 13 ){
      if ( this.buttonSend.action == 'add'){
        this.addCombo ( );

      } else if (this.buttonSend.action == 'edit'){
        this.setEditAdition( this.buttonSend.index );
      }
    }
  }


  removeAdition(i:number){
    this.theCombo.splice(i,1);
  }

  editAdition( i:number){

    this.vals.name = this.theCombo[i]["name"];
    this.vals.price = this.theCombo[i]["price"];


    this.setTypeOfButtonAdition('edit')
    this.buttonSend.index = i;


  }

  private setEditAdition( index:number){
    let newVal = this.vals;
    this.theCombo[index] = newVal;
    this.vals = {}
    
  }

  /** Cambiar el estilo de botón para agregar o editar un combo. 
   * @param {string} type Valor a ser transofrmado, permite add (Añadir nuevo menú) o edit ( para editar un menu)
   */
  private setTypeOfButtonAdition( type:string ){
    if ( type == 'add' ){
      this.buttonSend = {
        className: 'btn btn-success btn-sm',
        text: 'Agregar Combo',
        action: 'add'
      }
    }else if ( type == "edit"){
      this.buttonSend = {
        text: 'Editar Combo',
        className: "btn btn-primary btn-sm",
        action: 'edit'
      }
    }
  }


}
