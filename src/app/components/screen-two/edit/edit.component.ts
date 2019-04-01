import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit { 
  
  menus = [];
  presets = [];
  combos = [];
  ejects = []

  constructor( private db:DatabaseService) {
    this.getAllAwards();
  }


  /** Obtener todos los combos, menus ejecutivos, menu diarios y presets */
  private getAllAwards( ){
    let menus = this.db.searcQueryInCollection('secondscreen','type','menuday');
    let combos = this.db.searcQueryInCollection('secondscreen','type','combo');
    let ejecs = this.db.searcQueryInCollection('secondscreen','type','ejecutive');
    let presets = this.db.getFullCollection('presets');

    menus.subscribe( m => this.menus = m );
    combos.subscribe(m => this.combos = m );
    ejecs.subscribe(m => this.ejects = m );
    presets.subscribe( m => this.presets = m );
  }  

  ngOnInit() {}

  


}
