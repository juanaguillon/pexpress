import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel'
import { SlideService } from 'src/app/services/slide.service';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-pantalla-vertical',
  templateUrl: './pantalla-vertical.component.html',
  styleUrls: ['./pantalla-vertical.component.css']
})
export class PantallaVerticalComponent implements OnInit {


  elem;
  data = []
  data2 = []
  slideConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    pauseOnFocus: false
  }

  constructor(
    private slide: SlideService
  ) {
    this.slide.getAllDocs2()
      .pipe(
        map(results => {
          return results.map(f => {
            return {
              id: f.payload.doc.get('id'),
              name: f.payload.doc.get('name'),
              price: f.payload.doc.get('price')
            }
          })
        }
        ),
        flatMap(result => {
          let mp = []
          result.forEach(element => {

            this.slide.getImageById(element.id).toPromise()
              .then(result => {
                mp.push({
                  image: result,
                  title: element.name,
                  price: element.price
                })
              })

          });
          return of(mp);
        })

      )

      .subscribe(res => {
        setTimeout(() => {
          var mid = Math.ceil(res.length / 2);
          this.data = res.slice(0, mid);
          this.data2 = res.slice(mid);
          this.initSlick();    

        }, 3000);
       

      });

  }


  ngOnInit(): void {
    document.body.classList.add('overhidden');
    this.elem = document.documentElement;
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overhidden');

  }

  ngAfterViewInit(): void {
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

  initSlick( ){
    

    setTimeout(() => {
      if ($(".slick_1").hasClass("slick-initialized")) {
        $(".slick_1").slick("unslick");
      }
      if ($(".slick_2").hasClass("slick-initialized")) {
        $(".slick_2").slick("unslick");
      }
      $(".slick_1").slick(this.slideConfig);
      setTimeout(() => {
        
        $(".slick_2").slick(this.slideConfig);
      }, 5000);
      
    }, 3000);
  }



  beforeChange(e) {
    $(".slick-current .image_fully").removeClass("active");

  }

  afterChange(e) {
    $(".slick-current .image_fully").addClass("active");

  }



}
