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

  currentID:number;

  // Valores que serán almacenadas en la base de datos.
  inValues:any = {}

  
  ngOnInit() { 
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
    if (eeve.keyCode == 13 ){
      this.addLaunch(  )
    }
  }
  
  removeAdition( i ){
    this.launchers.splice( i,1 );
  }
}
