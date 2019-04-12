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
  buttonSend:any = {
    className: 'btn btn-success btn-sm',
    text: 'Agregar Combo',
    action: 'add'
  }

  private eventSubs:any;

  constructor() { }

  ngOnInit() {
    this.eventSubs = this.events.subscribe( ( ) => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "combo";
      this.inValues.combos = this.theCombo;
      this.methodName.emit( this.inValues )
    } )
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
      this.addCombo ( );
    }
  }


  removeAdition(i:number){
    this.theCombo.splice(i,1);
  }

  editAdition( i:number, ){
    this.vals.name = this.theCombo[i]["name"];
    this.vals.price = this.theCombo[i]["price"];


    this.buttonSend.text = 'Editar Combo';
    this.buttonSend.className = 'btn btn-primary btn-sm';
    this.buttonSend.action = 'edit';
    this.buttonSend.index = i;

  }

  private setEditAdition( index:number){

    this.theCombo[index] = this.vals;
    
  }


}
