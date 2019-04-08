import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-verticalitems2',
  templateUrl: './verticalitems2.component.html',
  styleUrls: ['./verticalitems2.component.css']
})
export class VerticalItems2Component implements OnInit {
  images = [];
  menu: any = {}
  combo: any = {};
  ejec: any = {}
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

  constructor(
    private slide: SlideService,
  ) {

    this.getPresets();
    this.getSliderDocs();

  }

  ngOnInit() { }

  // Obtener datos de slider
  public getSliderDocs() {

    this.slide.getSliderTwoDocs()
      .subscribe(res => {
        this.images = res;
      });

  }


  public getPresets() {
    let presets = this.slide.getTheConfig();

    // Filtro de presets
    let pipedPreset = presets.pipe(
      map(results => {
        return results.map(rf => {
          let cday = new Date().getDay();
          return rf["config"][cday];
        })
      }),
      switchMap(presets => this.slide.getPresetById(presets[0])),
      switchMap(preset => {
        // console.log( preset );
        let menuID = preset.get('menu')
        let comboID = preset.get('combo')
        let ejecID = preset.get('ejec')

        return combineLatest(
          this.slide.getSecondScreenDocById(menuID),
          this.slide.getSecondScreenDocById(comboID),
          this.slide.getSecondScreenDocById(ejecID)
        )
      })

    )

    // let fullPreset = pipedPreset.pipe( mergeAll() );

    pipedPreset.subscribe(resp => {
      this.menu = resp[0].data();
      this.combo = resp[1].data();
      this.ejec = resp[2].data();
      this.status = 1;
    });

  }
}
