import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlideService } from 'src/app/services/slide.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-editCombo',
  templateUrl: './editCombo.component.html',
  styleUrls: ['./editCombo.component.css']
})
export class EditComboComponent implements OnInit {


  currentTitle = "";
  vals: any = {}
  inValues: any = {}
  theCombo: any[] = []
  statusVals = [
    "Guardar",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Guardado"
  ]
  status = 0;

  constructor(
    private slide: SlideService,
    private database:DatabaseService,
    private activateRoute:ActivatedRoute
  ) {

    
    

    
    this.inValues.id = this.activateRoute.snapshot.params["id"];

    this.slide.getSecondScreenDocById( this.inValues.id )

    .subscribe( doc => {
      this.theCombo = doc.get('combos');
      this.currentTitle = doc.get('title');
    })
    
  }

  ngOnInit() { }

  addCombo() {
    let lengt = Object.keys(this.vals).length;
    if (lengt < 2) {
      alert('Añade nombre y precio a el combo')
    }

    this.theCombo.push(this.vals)
    this.vals = {};
  }

  removeCombo( number ){
    this.theCombo.splice( number, 1 );
  }

  enteringCombo(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      this.addCombo();
    }
  }

  saveDocument() {

    this.inValues.type = "combo";
    this.inValues.combos = this.theCombo;
    this.inValues.title = this.currentTitle;

    this.status = 1;

    const onProm = res => {
      alert('Combos actualizados correctamente');
      this.slide.updateConfig()
      this.status = 2;
    }

    const onError = error => {
      alert('Error al actualizar el combo')
      console.log(error);
    }


    let saved = this.database.saveDocument('secondscreen', this.inValues);
    saved.then(onProm);
    saved.catch(onError);

  }

}
