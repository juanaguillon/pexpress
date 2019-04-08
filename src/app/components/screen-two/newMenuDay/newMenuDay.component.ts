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
  
  subscribeObject:any;

  constructor() {
    
  }

  ngOnInit() { 
    this.subscribeObject = this.searchInfo.subscribe( ( ) => {
      this.inValues.id = new Date().getTime();
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
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.inValues = {};
      this.adiciones = [];
    }
  }

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

  removeAdition( i:number ){

    this.adiciones.splice(i, 1 );
    
  }

  
}
