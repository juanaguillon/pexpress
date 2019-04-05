import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
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
  
  constructor() { }

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log( changes );
    if ( changes.data && changes.data.currentValue !== undefined){
      this.theCombo = changes.data.currentValue['combos'];
    } else if (changes.data && changes.data.currentValue == undefined ){
      this.theCombo = [];
    }
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


}
