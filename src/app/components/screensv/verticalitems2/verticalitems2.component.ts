import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-verticalitems2',
  templateUrl: './verticalitems2.component.html',
  styleUrls: ['./verticalitems2.component.css']
})
export class VerticalItems2Component implements OnInit {


  @Input() preset
  elem;

  images = [];
  launcs: any = {}
  combo: any = {};
  ejec: any = {}
  menu:any = {}
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

    if (changes.preset.currentValue != undefined) {

      let menuID = this.preset.get('menu');
      let comboID = this.preset.get('combo');
      let ejecID = this.preset.get('ejec');

      this.slide.getSecondScreenDocById(menuID)
        .subscribe(doc => {
          this.menu = doc.data()
        })

      this.slide.getSecondScreenDocById(comboID)
        .subscribe(doc => {
          this.combo = doc.data()
        })

      this.slide.getSecondScreenDocById(ejecID)
        .subscribe(doc => {
          this.ejec = doc.data()
        });

      this.status = 1;


    }
  }



 

}
