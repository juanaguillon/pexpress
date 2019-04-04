import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newCombo',
  templateUrl: './newCombo.component.html',
  styleUrls: ['./newCombo.component.css']
})
export class NewComboComponent implements OnInit {

  @Output() methodName = new EventEmitter<string>();
  @Input() events:Observable<void>;
  @Input() data;
  
  vals:any = {}
  inValues:any = {}
  theCombo:any[] = []
  private eventSubs:any;
  
  constructor(
  ) { }

  ngOnInit() {
    this.eventSubs = this.events.subscribe( ( ) => {
      this.inValues.id = new Date().getTime();
      this.inValues.type = "combo";
      this.inValues.combos = this.theCombo;
      this.methodName.emit( this.inValues )
    } )
  }

  ngOnDestroy(): void {
    this.eventSubs.unsubscribe();
  }
  
  addCombo( ){
    let lengt = Object.keys( this.vals ).length;
    if ( lengt < 2 ){
      alert('Añade nombre y precio a el combo')
      return;
    }

    this.theCombo.push(this.vals )
    this.vals = {};
  }

  enteringCombo( e ){
    e.preventDefault();
    if ( e.keyCode == 13 ){
      this.addCombo ( );
    }
  }

  // saveDocument( ){
  //   this.inValues.id = new Date().getTime();
  //   this.inValues.type = "combo";
  //   this.inValues.combos = this.theCombo;
  //   this.inValues.title = this.currentTitle;
    
  //   const onProm = res => {
  //     alert('Combos guardados correctamente');
  //   }

  //   const onError = error => {
  //     alert('Error al crear el combo')
  //     console.log( error );
  //   }
    
    
  //   let saved = this.database.saveDocument( 'secondscreen', this.inValues );
  //   saved.then( onProm );
  //   saved.catch( onError );
    
  // }


}
