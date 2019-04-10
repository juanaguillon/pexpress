import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-screensv',
  templateUrl: './screensv.component.html',
  styleUrls: ['./screensv.component.css']
})
export class ScreensvComponent implements OnInit {

  /** Se usará para ver que tipo de preset es.
  * Puede ser fds o daily  
  */
  presetType: string;
  currentPreset;
  elem;

  
  constructor(private slide: SlideService) {
    this.getPresets()
   
   }

  ngOnInit(): void {
    this.elem = document.documentElement;
   
   }


  public getPresets() {
    let presets = this.slide.getTheConfig();

    // Filtro de presets
    let pipedPreset = presets.pipe(
      map(results => {
        return results.map(rf => {
          let cday = new Date().getDay() + 1;
          return rf["config"][cday];
        })
      }),
      switchMap(presets => this.slide.getPresetById(presets[0]))     

    )

    pipedPreset.subscribe( doc => {
      if (doc.get('type') && doc.get('type') == 'fds' ){
        this.presetType = 'fds';
      }
      this.currentPreset = doc
    });   

  }

  openFullScreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  
}
