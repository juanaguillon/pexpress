import { Component, OnInit } from '@angular/core';
import { map, flatMap, switchMap, mergeAll, concatAll, tap } from 'rxjs/operators/';
import { forkJoin, of, from, combineLatest } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { SlideService } from '../../services/slide.service';

@Component({
  selector: 'app-verticalItems',
  templateUrl: './verticalItems.component.html',
  styleUrls: ['./verticalItems.component.css']
})
export class VerticalItemsComponent implements OnInit {

  images = [];
  menu:any = {}
  combo:any = {};
  ejec:any = {}
  status = 0;


  slideOption = {
    autoplay: true,
    autoplaySpeed: 700,
    loop: true,
    margin: 0,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  }

  constructor(private prservice: ProductService,
    private slide: SlideService,
  ) {
    
    this.getPresets();
    this.getSliderDocs();
    
  }

  ngOnInit() {
  }

  // Obtener datos de slider
  public getSliderDocs( ){

    // FlatMap Function
    const flatF = (result )=>{
      let mp = []
      result.forEach(element => {
        mp.push(this.slide.getImageById(element.id))
      });

      return forkJoin(mp);
    }

    // Map Fucntion
    const mapF = results => {
      return results.map(f => {
        return {
          id: f.payload.doc.get('id'),
          name: f.payload.doc.get('name')
        }
      })
    }

    const docs = this.slide.getAllDocs();
    docs.pipe( map( mapF ), flatMap( flatF ) )
    .subscribe(res => {
      this.images = res;
    });

  }
  

  public getPresets( ){
    let presets = this.slide.getTheConfig();
    
    // Filtro de presets
    let pipedPreset = presets.pipe(
      map( results => {
        return results.map( rf => {
          let cday = new Date().getDay();
          return rf["config"][ cday ];
        } )
      } ),
      switchMap( presets => this.slide.getPresetById(presets[0]) ),
      switchMap( preset => {
        // console.log( preset );
        let menuID = preset.get('menu')
        let comboID = preset.get('combo')
        let ejecID = preset.get('ejec')

        return combineLatest(
          this.slide.getSecondScreenDocById(menuID),
          this.slide.getSecondScreenDocById(comboID),
          this.slide.getSecondScreenDocById(ejecID)
        )
      } )

    )

    // let fullPreset = pipedPreset.pipe( mergeAll() );

    pipedPreset.subscribe( resp => {
      this.menu = resp[0].data();
      this.combo = resp[1].data();
      this.ejec = resp[2].data();
      this.status = 1;
    } );
    
  }



}
