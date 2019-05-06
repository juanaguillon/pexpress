import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newnight',
  templateUrl: './newnight.component.html',
  styleUrls: ['./newnight.component.css']
})
export class NewNightComponent implements OnInit {
  @Output() takeInfo = new EventEmitter<string>();
  @Input() searchInfo: Observable<void>;
  @Input() data;

  vals: any = {}
  inValues: any = {}
  theCombo: any[] = []
  nightName:string;

  buttonSend:any;

  currentID: number;

  private eventSubs: any;

  constructor() { }

  ngOnInit() {
    this.setTypeButtonSend('add');
    
    this.eventSubs = this.searchInfo.subscribe(() => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "nightcombo";
      this.inValues.combos = this.theCombo;
      this.inValues.name = this.nightName;
      this.takeInfo.emit(this.inValues)
    })
  }

  ngOnDestroy(): void {
    this.eventSubs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.currentID = parseInt(changes.data.currentValue.id)
      this.theCombo = changes.data.currentValue['combos'];
      this.nightName = changes.data.currentValue["name"]
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.currentID = null;
      this.theCombo = [];
      this.nightName = "";
    }
  }

  addCombo() {
    let lengt = Object.keys(this.vals).length;
    if (lengt < 2) {
      alert('Añade nombre y precio a el combo')
      return;
    }

    this.theCombo.push(this.vals)
    this.vals = {};
  }

  enteringCombo(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      this.addCombo();
    }
  }

  removeAdition(i: number) {
    this.theCombo.splice(i, 1);
  }


  /** Preparar para editar una menu. */
  prepareToEditAdition(e) {
    e.preventDefault()

    this.setTypeButtonSend('edit');
    this.buttonSend.index = e.target.getAttribute('data-index')
    let i = this.buttonSend.index;
    let newVals = {
      name: this.theCombo[i].name,
      price: this.theCombo[i].price
    }


    this.vals = newVals;
    
  }

  /* Guardar menú modificado */
  private setEditAdition(i) {
    let newVal = {
      name: this.vals.name,
      price: this.vals.price,
    }


    this.theCombo[i] = newVal;
    this.vals = {}
  }

  /** Se ejecuta al clickear el botón para agregar/editar combo */
  sendEditingAdition(e) {
    e.preventDefault();
    let event = e.target.getAttribute('data-event');

    if (event == 'add') {
      this.addCombo();
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
        text: "Añadir combo",
        className: 'btn btn-sm btn-success',
        action: 'add'
      }
    } else if (type == 'edit') {
      this.buttonSend = {
        text: "Editar combo",
        className: 'btn btn-sm btn-primary',
        action: 'edit'
      }
    }
  }
  
  
}
