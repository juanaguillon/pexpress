import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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

  // Valores que serán almacenadas en la base de datos.
  inValues:any = {}

  
  ngOnInit() { 
    this.subscribeData = this.searchInfo.subscribe( doc => {
      this.inValues.id = new Date().getTime();
      this.inValues.type = "fdslaunchs"
      this.inValues.aditions = this.launchers;

      this.takeInfo.emit(this.inValues);
    })    
    
  }

  ngOnDestroy(): void {
    this.subscribeData.unsubscribe();
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
