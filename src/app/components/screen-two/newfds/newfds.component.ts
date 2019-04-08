import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newfds',
  templateUrl: './newfds.component.html',
  styleUrls: ['./newfds.component.css']
})
export class NewFdsComponent implements OnInit {
  constructor() { }

  @Output() takeInfo = new EventEmitter();
  @Input() searcInfo:Observable<any>
  @Input() data;

  subscribeData;
  launchers = [];
  launcData:any = {}

  // Valores que serán almacenadas en la base de datos.
  inValues:any = {}

  
  ngOnInit() { 
    this.subscribeData = this.searcInfo.subscribe( doc => {
      
    })    
    
  }

  ngOnDestroy(): void {
    this.subscribeData.unsubscribe();
  }

  addLaunch( e ){
    e.preventDefault();

    this.launchers.push(this.launcData)
    this.launcData = {}
  }

  addLaunchKey( e ){
    if ( e.keyCode == 27 ){
      this.addLaunch( e )
    }
  }
  
  removeAdition( i ){
    this.launchers.splice( i,1 );
  }
}
