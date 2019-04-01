import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';
import { SlideService } from 'src/app/services/slide.service';

@Component({
  selector: 'app-editMenu',
  templateUrl: './editMenu.component.html',
  styleUrls: ['./editMenu.component.css']
})
export class EditMenuComponent implements OnInit {

  adiciones: string[] = [];
  currentAdition = "";
  inValues: any = {};
  statusVals = [
    "Guardar",
    "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>",
    "Guardado"
  ]
  status = 0;


  constructor(
    private database: DatabaseService,
    private activeRouter:ActivatedRoute,
    private slide:SlideService
  ) { }

  ngOnInit() { 


    this.inValues.id = this.activeRouter.snapshot.params["id"];
    this.slide.getSecondScreenDocById(this.inValues.id)
    .subscribe( doc => {
      this.adiciones = doc.get('aditions');
      this.inValues = doc.data();
    })
    
  }

  addAdition() {
    if (!this.currentAdition) {
      alert('Agrega una adicion antes')
      return;
    }

    this.adiciones.push(this.currentAdition);
    this.currentAdition = "";

  }

  addAditionWithEnter(e) {
    if (e.keyCode == 13) {
      this.addAdition();
    }
  }


  removeAdition( i:number){
    this.adiciones.splice(i, 1 );
  }

  saveMenu() {
    let lengt = Object.keys(this.inValues).length
    if (lengt < 5) {
      alert('Todos los campos son obligatorios')
      return false;
    }
    if (this.status == 1) return false;

    this.inValues.aditions = this.adiciones;
    this.inValues.type = 'menuday';

    this.status = 1

    const promResolve = (res) => {
      alert('Menú actualizado correctamente');
      this.status = 2;
    }
    const promError = (error) => {
      this.status = 0
      alert('Error al actualizar el documento')
      console.log(error);
    }

    this.database.saveDocument('secondscreen', this.inValues).then(promResolve).catch(promError);



  }

}
