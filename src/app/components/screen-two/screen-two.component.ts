import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Subject, empty} from 'rxjs';
import { SlideService } from 'src/app/services/slide.service';
import { switchMap, combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-screen-two',
  templateUrl: './screen-two.component.html',
  styleUrls: ['./screen-two.component.css']
})
export class ScreenTwoComponent implements OnInit {

  /**
   * Se usará para gurdar la información de los componentes hijos.
   */
  compVals:any = [];
  
  
  eventsSubject = new Subject();
  actualPreset:number;
  currentID:number;


  compActive = 1;
  presets = []
  config = [];
  currentTitle:string;
  isFDS:boolean;

  status = 0;
  statusHTML = [
    "Guardar preset",
    '<div class="spinner-border" role="status"></div>'
  ]
  
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


  /** 
   * Emitir seleccion de datos a los componenets hijos 
   * Esta función se emitirá al momento de clickear el botón "Guardar Preset" en el componenete padre.
   * */
  emitToChildren( ){
    
    
    this.eventsSubject.subscribe({      
      next: ( ) => {
        
        this.saveDataChildrens( );
      }
    });
    this.eventsSubject.next();


  }  


  private saveDataChildrens( ):void{
    // Evitar multiples click al guardar
    if ( this.status == 1 ) return;
    
    if ( this.compVals.length > 0){

      // Loading status
      this.status = 1;
      if ( this.currentID == null ){

        // Con esta adición + diez, se evitará la reescritura de el documento, pues si se imprime el array compVals, se notará que los id tienen el mismo número, y esto provacará que no se guarde correctamente los 3 documentos.
        this.compVals[1]['id'] += 10;
        this.compVals[2]['id'] += 20;
        this.compVals[3]['id'] += 30;
      }
      
      let savedChecked = true;    
      const err = ( ) => {
        alert('Error al guardar el preset. Intente nuevamente');
        savedChecked = false;
        return false;
      }
  
      // En caso error al guardar los documentos, se cambiar la variable savedChecked, y no permitirá guardar el preset actual.      
      
      if (this.compVals.length == 8){
        this.compVals.splice(0,4);
      }
      this.db.saveDocument('secondscreen', this.compVals[0]).catch(err);
      this.db.saveDocument('secondscreen', this.compVals[1]).catch(err);
      this.db.saveDocument('secondscreen', this.compVals[2]).catch(err);
      this.db.saveDocument('secondscreen', this.compVals[3]).catch(err);

      console.log( this.compVals );
      

      if ( savedChecked ){
        this.saveThePreset();        
      }
    }  

    

    
  }

  // Obtener la configuración actual.
  // Esta configuración será usada para mostrar en la pantalla vertical de la aplicación. */verticalproductos.*
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
          this.isFDS = doc.get('type') && doc.get('type') == 'fds' ? true: false;
          let returnedAr = [
            this.slide.getSecondScreenDocById(menuID),
            this.slide.getSecondScreenDocById(comboID),
            this.slide.getSecondScreenDocById(ejecID),
            this.slide.getSecondScreenDocById(doc.get('menufds'))
          ]
          
          return returnedAr;

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

  /**
   * Llamar la información de los componentes hijos.
   * Este métodos se usará en el HTML para obtener su respectiva información.
   * */
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

  /**
   * Guardar el preset actual, este se ejecutará cuando los menus, combos, ejecutivos, etc, sean satisfactoriamente guardados.
   */
  private saveThePreset( ){

    // Guardar en la colección de presets.

    let data = {
      menu: this.compVals[0]["id"],
      combo: this.compVals[1]["id"],
      ejec: this.compVals[2]["id"],
      menufds: this.compVals[3]['id'],
      title: this.currentTitle,
      type: (this.isFDS) ? 'fds' : 'nofds'
    }


    // El array this.compVals, toma comportamiento bidireccional, de componente padre (screen two) a componentes hijos ( newfds, newfdscomb, newmenuday, etc ), y viceversa.
    // Al momento de hacer un console.log de dicha variable, podría enviar hasta 4 u 8 elementos en el array.
    // Es esta razón, por la que estaremos agregando la siguiente condicional.

   

    if (this.currentID == null) {
      data["id"] = new Date().getTime() + 1;
    } else {
      data["id"] = this.currentID;
    }

    this.db.saveDocument('presets', data).then(rf => {
      alert('Preset guardado correctamente');
      this.status = 0;
      this.compVals = [];
    })

    this.slide.updateConfig();
    
  }



}
