import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit {

  compActive = 1;
  presets = []
  config = [];
  dayWeek:any = [
    { name: "Domingo", day:0 },
    { name: "Lunes", day:1 },
    { name: "Martes", day:2 },
    { name: "Miércoles", day:3 },
    { name: "Jueves", day:4 },
    { name: "Viernes", day:5 },
    { name: "Sábado", day:6 }
  ]
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DatabaseService
  ) {
    this.getPresets();
    this.checkIfHadPresets();
   }

  ngOnInit() {
  }

  checkIfHadPresets( ){
    this.db.getDocById( 'config','actual_presets' ).subscribe( doc => {
      // console.log( doc )
      this.config = doc["config"];
    })
  }
  
  closeSesion($e) {
    $e.preventDefault();
    this.auth.closeSesion();
    this.router.navigate(["/login"]);
  }

  toggleComponent($e, number: number) {
    $e.preventDefault();
    this.compActive = number;
  }

  public getPresets( ){
    this.db.getFullCollection('presets').subscribe( docs => {
      this.presets = docs;
    })
  }

  public saveConfig( ){

    if ( this.config.length < 7 || this.config.includes(undefined) ){
      alert('Porfavor, añade un preset a todos los días');
      return;
    }
    
    let data = {
      config: this.config,
      id: "actual_presets"
    }
    this.db.saveDocument("config", data ).then( resp => alert('Configuración guardada correctamente') )
    .catch( err => { alert('Error al guardar la configuración') ; console.log( err ) })

  }



}
