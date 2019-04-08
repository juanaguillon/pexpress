import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  
  menuName:string;
  subs;
  
  
  constructor() { }

  ngOnInit(): void {
    this.subs = this.searchInfo.subscribe( doc => {
      this.inValues.id = new Date().getTime();
      this.inValues.type = "fdscombo"
      this.inValues.aditions = this.aditions;

      this.takeInfo.emit( this.inValues );
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe()
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
