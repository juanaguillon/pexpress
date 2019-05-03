import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SlideService } from 'src/app/services/slide.service';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-pantalla-vertical',
  templateUrl: './pantalla-vertical.component.html',
  styleUrls: ['./pantalla-vertical.component.css']
})
export class PantallaVerticalComponent implements OnInit {

  data = []
  data2 = []
  slideConfig = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
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
        this.data = res;
      });

    // this.data = [
    //   {
    //     title: 'Hamburguesa',
    //     image: 'assets/images/foto_1.jpg',
    //     price: 9000
    //   },
    //   {
    //     title: 'Churrasco',
    //     image: 'assets/images/foto_9.jpg',
    //     price: 17000
    //   },      
    //   {
    //     title: 'Costillas BBQ',
    //     image: 'assets/images/costillas2.jpg',
    //     price: 23000
    //   },
    //   {
    //     title: 'Mojarra',
    //     image: 'assets/images/foto_8.jpg',
    //     price: 24000
    //   },
    //   {
    //     title: 'Parrilla',
    //     image: 'assets/images/foto_7.jpg',
    //     price: 25000
    //   }
    // ];    

  }


  ngOnInit(): void {
    document.body.classList.add('overhidden');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.body.classList.remove('overhidden');

  }

  

  beforeChange(e) {
    $(".slick-current .image_fully").removeClass("active");

  }

  afterChange(e) {
    $(".slick-current .image_fully").addClass("active");

  }



}
