import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit { 
  
  menus = [];
  presets = [];
  combos = [];
  ejects = [];
  
  isChildrened:boolean;

  constructor( 
    private db:DatabaseService ,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {
    this.getAllAwards();

    // Verificar si está actualmente en un componenete Hijo.
    this.router.events.subscribe( ev => {
      this.isChildrened = this.activeRoute.children.length > 0
    });

    
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
