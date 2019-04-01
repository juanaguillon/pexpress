import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { SlideService } from 'src/app/services/slide.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editEjecutive',
  templateUrl: './editEjecutive.component.html',
  styleUrls: ['./editEjecutive.component.css']
})
export class EditEjecutiveComponent implements OnInit {


  currentTitle = "";
  vals: any = {}
  currentAdition = ""
  aditions = [];
  menus = []

  inValues: any = {}
  statusVals = [
    "Guardar",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Guardado"
  ]
  status = 0;

  constructor(
    private database: DatabaseService,
    private slide:SlideService,
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit() { 

    this.inValues.id = this.activeRoute.snapshot.params["id"]
    
    this.slide.getSecondScreenDocById( this.inValues.id ).subscribe( doc => {
      this.menus = doc.get('menus');
      this.currentTitle = doc.get('title');
    })
    
  }

  addAdition() {

    if (this.currentAdition == "") return false;

    this.aditions.push(this.currentAdition)
    this.currentAdition = "";
  }

  removeMenu(i:number){
    this.menus.splice( i , 1 );
  }

  enteringAdition(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      this.addAdition();
    }
  }


  addMenu() {
    let data = {
      name: this.vals.title,
      price: this.vals.price,
      aditions: this.aditions
    }

    this.menus.push(data);

    this.aditions = []
    this.vals = {}

  }

  saveDocument() {

    this.inValues.type = "ejecutive";
    this.inValues.menus = this.menus;
    this.inValues.title = this.currentTitle;

    this.status = 1;

    const onProm = res => {
      alert('Menu ejecutivo guardado correctamente');
      this.status = 2;
    }

    const onError = error => {
      alert('Error al crear el combo')
      console.log(error);
    }


    let saved = this.database.saveDocument('secondscreen', this.inValues);
    saved.then(onProm);
    saved.catch(err => console.log(err));

  }

}
