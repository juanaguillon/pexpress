import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newfds',
  templateUrl: './newfds.component.html',
  styleUrls: ['./newfds.component.css']
})
export class NewFdsComponent implements OnInit {
  constructor() { }

  @Output() takeInfo = new EventEmitter();
  @Input() searchInfo:Observable<any>
  @Input() data;

  subscribeData;
  launchers = [];
  launcData:any = {}


  buttonSend:any;
  currentID:number;

  // Valores que serán almacenadas en la base de datos.
  inValues:any = {}

  
  ngOnInit() { 

    this.setTypeButtonSend('add')
    
    this.subscribeData = this.searchInfo.subscribe( doc => {

      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "fdslaunchs"
      this.inValues.aditions = this.launchers;

      this.takeInfo.emit(this.inValues);
    })    
    
  }

  ngOnDestroy(): void {
    this.subscribeData.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.currentID = parseInt(changes.data.currentValue.id)
      this.launchers = changes.data.currentValue['aditions'];
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.currentID = null;
      this.launchers = [];
    }
  } 

  addLaunch(  ){

    this.launchers.push(this.launcData)
    this.launcData = {}
  }

  addLaunchKey( eeve ){
    if (eeve.keyCode == 13  ){

      if (this.buttonSend.action == "add"){
        this.addLaunch(  )

      } else if (this.buttonSend.action == "edit" ){
        this.setEditAdition(this.buttonSend.index );
        this.setTypeButtonSend('add');
      }
    }
  }
  
  removeAdition( i ){
    this.launchers.splice( i,1 );
  }


  prepareToEditAdition(e) {
    e.preventDefault()

    this.setTypeButtonSend('edit');
    this.buttonSend.index = e.target.getAttribute('data-index')
    let i = this.buttonSend.index;

    this.launcData = {
      name: this.launchers[i].name,
      price: this.launchers[i].price
    }
  }

  /* Guardar menú modificado */
  private setEditAdition(i) {
    let newVal = {
      name: this.launcData.name,
      price: this.launcData.price
    }
    this.launchers[i] = newVal;
    this.launcData = {}
  }

  /** Se ejecuta al clickear el botón para agregar/editar menú */
  sendEditingAdition(e) {
    e.preventDefault();
    let event = e.target.getAttribute('data-event');

    if (event == 'add') {
      this.addLaunch();
    } else if (event == 'edit') {

      let index = e.target.getAttribute('data-index');
      this.setEditAdition(index);
      this.setTypeButtonSend("add")
    }
  }

  /** Cambiar el botón de añadir/editar menú */
  private setTypeButtonSend(type: string) {
    if ('add' == type) {
      this.buttonSend = {
        text: "Agregar almuerzo",
        className: 'btn btn-success btn-sm my-1',
        action: 'add'
      }
    } else if (type == 'edit') {
      this.buttonSend = {
        text: "Editar almuerzo",
        className: 'btn btn-primary btn-sm my-1',
        action: 'edit'
      }
    }
  }
}
