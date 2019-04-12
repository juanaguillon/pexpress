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

  isNight: boolean = false;
  
  constructor(private slide: SlideService) {
    this.getPresets()
   
   }

  ngOnInit(): void {


    this.elem = document.documentElement;

    let date =  new Date();
    if ( date.getHours( ) < 17 ){

      let min = 60 - date.getMinutes();
      setTimeout(() => {
  
        let date = new Date().getHours();
        if ( date != 17 ){
          setInterval(() => {
      
            let currentDate = new Date().getHours();
            if (currentDate == 17) {
              this.isNight = true;
              clearInterval()
            }
      
          }, 3600000);
        } else if (date == 17 ){
          this.isNight = true;
        }
  
        
      }, min * 60000 );

    }else{
      this.isNight = true;
    }

    
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
      switchMap(presets => this.slide.getPresetById(presets[0]))     

    )

    pipedPreset.subscribe( doc => {
      this.presetType = doc.get('type')
      this.currentPreset = doc;
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
