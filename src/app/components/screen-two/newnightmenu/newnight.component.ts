import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-newnight',
  templateUrl: './newnight.component.html',
  styleUrls: ['./newnight.component.css']
})
export class NewNightComponent implements OnInit {
  @Output() takeInfo = new EventEmitter<string>();
  @Input() searchInfo: Observable<void>;
  @Input() data;

  vals: any = {}
  inValues: any = {}
  theCombo: any[] = []
  nightName:string;

  currentID: number;

  private eventSubs: any;

  constructor() { }

  ngOnInit() {
    this.eventSubs = this.searchInfo.subscribe(() => {
      this.inValues.id = this.currentID != null ? this.currentID : new Date().getTime();
      this.inValues.type = "nightcombo";
      this.inValues.combos = this.theCombo;
      this.inValues.name = this.nightName;
      this.takeInfo.emit(this.inValues)
    })
  }

  ngOnDestroy(): void {
    this.eventSubs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue !== undefined) {
      this.currentID = parseInt(changes.data.currentValue.id)
      this.theCombo = changes.data.currentValue['combos'];
      this.nightName = changes.data.currentValue["name"]
    } else if (changes.data && changes.data.currentValue == undefined) {
      this.currentID = null;
      this.theCombo = [];
      this.nightName = "";
    }
  }

  addCombo() {
    let lengt = Object.keys(this.vals).length;
    if (lengt < 2) {
      alert('Añade nombre y precio a el combo')
      return;
    }

    this.theCombo.push(this.vals)
    this.vals = {};
  }

  enteringCombo(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      this.addCombo();
    }
  }

  removeAdition(i: number) {
    this.theCombo.splice(i, 1);
  }
}
