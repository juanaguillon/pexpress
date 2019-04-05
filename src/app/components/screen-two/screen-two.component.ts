import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Subject } from 'rxjs';
import { SlideService } from 'src/app/services/slide.service';
import { switchMap, combineLatest, flatMap, combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit {

  compVals:any = [];
  eventsSubject = new Subject;
  actualPreset:number;
  currentID:number;

  compActive = 1;
  presets = []
  config = [];
  currentTitle:string ;
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
    private db: DatabaseService,
    private slide:SlideService,
  ) {
    this.getPresets();
    this.checkIfHadPresets();    
   }

  ngOnInit() {}

  /* Emitir seleccion de datos a los componenets hijos */
  emitToChildren( ){
    this.eventsSubject.subscribe({      
      next: ( ) => {
        this.saveDataChildrens( );
      }
    })

    this.eventsSubject.next();

  }  

  saveDataChildrens( ){
    
    if ( this.currentID == null ){
      this.compVals[1]['id'] += 10;
      this.compVals[2]['id'] += 20;
    }
    
    let savedChecked = true;    
    const err = ( ) => {
      alert('Error al guardar el preset. Intente nuevamente');
      savedChecked = false;
      return false;
    }

    
    this.db.saveDocument('secondscreen', this.compVals[0] ).catch(err);
    this.db.saveDocument('secondscreen', this.compVals[1] ).catch(err);
    this.db.saveDocument('secondscreen', this.compVals[2] ).catch(err);

    if ( savedChecked ){
      let data = {
        menu: this.compVals[0]["id"],
        combo: this.compVals[1]["id"],
        ejec: this.compVals[2]["id"],
        title: this.currentTitle
      }

      if ( this.currentID == null ){
        data["id"] = new Date().getTime();
      }else{
        data["id"] = this.currentID;
      }
      this.db.saveDocument('presets', data )
      this.slide.updateConfig();
    }

    
  }

  // Obtener la configuración actual.
  checkIfHadPresets( ){
    this.db.getDocById( 'config','actual_presets' ).subscribe( doc => {
      this.config = doc["config"];
    })
  }


  changeThePreset( event ){
    let id = event.target.value;

    if ( id == "new" ){
      this.currentID = null;
      this.compVals = [];
    }else{
      
      // Agregar el id actual para evitar nueva creación de preset.
      this.currentID = id;

      let preset = this.slide.getPresetById( id ).pipe(
        switchMap( doc => {
          let menuID = doc.get('menu');
          let comboID = doc.get('combo');
          let ejecID = doc.get('ejec');
          this.currentTitle = doc.get('title'); 
          return [
            this.slide.getSecondScreenDocById(menuID),
            this.slide.getSecondScreenDocById(comboID),
            this.slide.getSecondScreenDocById(ejecID)
          ]          
        }),
        combineAll()
      )
      
      preset.subscribe( docs => {
        this.compVals = docs.map( doc => {
          return doc.data();
        })        
      });
    }



  }

  reciveValsComponent( e ){
    this.compVals.push(e);
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

  /**
   * Obtener todos los presets actuales.
   */
  public getPresets( ){
    this.db.getFullCollection('presets').subscribe( docs => {
      this.presets = docs;
    })
  }

  /**
   * Guardar los preset seleccionados en la semana.
   */
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
