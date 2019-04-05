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


  inValues: any = {}
  subscibedObject:any;
 
  constructor() { }

  ngOnInit() {
    this.subscibedObject = this.searchInfo.subscribe( ( ) => {
      this.inValues.id = new Date().getTime();
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
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.menus = [];
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

  // saveDocument() {
  //   this.inValues.id = new Date().getTime();
  //   this.inValues.type = "ejecutive";
  //   this.inValues.menus = this.menus;
  //   this.inValues.title = this.currentTitle;
    
  //   this.status = 1;

  //   const onProm = res => {
  //     alert('Menu ejecutivo guardado correctamente');
  //     this.status = 2;
  //   }

  //   const onError = error => {
  //     alert('Error al crear el combo')
  //     console.log(error);
  //   }


  //   let saved = this.database.saveDocument('secondscreen', this.inValues);
  //   saved.then(onProm);
  //   saved.catch(err => console.log(err));

  // }

}
