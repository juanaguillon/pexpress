import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-newEjecutive',
  templateUrl: './newEjecutive.component.html',
  styleUrls: ['./newEjecutive.component.css']
})
export class NewEjecutiveComponent implements OnInit {

  @Output() takeInfo = new EventEmitter;
  @Input() searchInfo:Observable<any>;
  @Input() data;

  vals: any = {}
  currentAdition = ""
  aditions = [];
  menus = []

  currentID:number;

  inValues: any = {}
  subscibedObject:any;

  constructor() { }

  ngOnInit() {
    this.subscibedObject = this.searchInfo.subscribe( ( ) => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "ejecutive";
      this.inValues.menus = this.menus;

      this.takeInfo.emit( this.inValues );
    } )
  }

  ngOnDestroy(): void {
    this.subscibedObject.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue != undefined) {
      this.menus = changes.data.currentValue.menus;
      this.currentID = parseInt(changes.data.currentValue.id)
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.menus = [];
      this.currentID = null;
    }
  }


  addAdition() {

    if ( this.currentAdition == "") return false;

    this.aditions.push(this.currentAdition)
    this.currentAdition = "";
  }

  enteringAdition(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      this.addAdition();
    }
  }


  addMenu( ){
    let data = {
      name: this.vals.title,
      price: this.vals.price,
      aditions: this.aditions
    }

    this.menus.push( data );

    this.aditions = [ ]
    this.vals = {}

  }

  removeAdition(i: number) {
    this.menus.splice(i, 1);
  }


}
