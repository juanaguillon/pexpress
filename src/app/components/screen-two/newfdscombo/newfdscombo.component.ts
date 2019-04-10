import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newfdscombo',
  templateUrl: './newfdscombo.component.html',
  styleUrls: ['./newfdscombo.component.css']
})
export class NewFdsComboComponent implements OnInit {

  @Output() takeInfo = new EventEmitter();
  @Input() searchInfo: Observable<any>;
  @Input() data;
  
  aditionData:any = {}
  aditions:any[] = []

  // Valors que serán guardados en la base de datos.
  inValues:any = {}


  // Evitar la nueva creación de menu en caso de estar en actualización.
  currentID: number;

  
  menuName:string;
  subs;
  
  
  constructor() { }

  ngOnInit(): void {
    this.subs = this.searchInfo.subscribe( doc => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "fdscombo"
      this.inValues.aditions = this.aditions;
      this.inValues.name = this.menuName
      this.takeInfo.emit( this.inValues );
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.currentID = parseInt(changes.data.currentValue.id)
      this.aditions = changes.data.currentValue['aditions'];
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.currentID = null;
      this.aditions = [];
    }
  } 

  removeAdition( i ){
    this.aditions.splice(i, 1)
  }

  addAdition(){
    if (Object.values(this.aditionData).length == 0 || this.aditionData == {} ){
      alert('Debes agregar almenos una adicion.')
      return;
    }
    
    this.aditions.push( this.aditionData );
    this.aditionData = {};
    
  }

  addAditionKey( e){
    if ( e.keyCode == 13 ){
      this.addAdition( );
    }
  }
  
}