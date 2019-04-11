import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';

@Component({
  selector: 'app-verticalItems',
  templateUrl: './verticalItems.component.html',
  styleUrls: ['./verticalItems.component.css']
})
export class VerticalItemsComponent implements OnInit {

  @Input() preset
  elem;
  
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
    // @Inject(DOCUMENT) private document: any
  ) {

    // this.getPresets();
    this.getSliderDocs();

  }

  ngOnInit() {
    this.elem = document.documentElement;
   }

  // Obtener datos de slider
  public getSliderDocs() {

    this.slide.getSliderTwoDocs()
      .subscribe(res => {
        this.images = res;
      });

  }

  ngOnChanges(changes: SimpleChanges): void {

    if ( changes.preset.currentValue != undefined ){
      let menuID = this.preset.get('menu');
      let comboID = this.preset.get('combo');
      let ejecID = this.preset.get('menufds');
  
      this.slide.getSecondScreenDocById(menuID)
      .subscribe( doc => {
        this.menu = doc.data()
      })

      this.slide.getSecondScreenDocById(comboID)
      .subscribe( doc => {
        this.combo = doc.data()
      })

      this.slide.getSecondScreenDocById(ejecID)
      .subscribe( doc => {
        console.log(doc.data());
        this.ejec = doc.data()
      });

      this.status = 1;

     
    }
  }



  openFullScreen(){
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
