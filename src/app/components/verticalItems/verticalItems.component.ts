import { Component, OnInit } from '@angular/core';
import { map, switchMap, mergeMap, concatMap, tap, flatMap } from 'rxjs/operators/';
import { of, merge, forkJoin } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { SlideService } from '../../services/slide.service';

@Component({
  selector: 'app-verticalItems',
  templateUrl: './verticalItems.component.html',
  styleUrls: ['./verticalItems.component.css']
})
export class VerticalItemsComponent implements OnInit {

  images = [];
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
    private slide: SlideService
  ) {
    

    // Obtener datos de slider
    this.slide.getAllDocs()
      .pipe(
        map(results => {
          return results.map(f => {
            return {
              id: f.payload.doc.get('id'),
              name: f.payload.doc.get('name')
            }
          })
        }
        ),
        flatMap(result => {

          let mp = []
          result.forEach(element => {
            mp.push(this.slide.getImageById(element.id))
          });

          return forkJoin(mp);

        })

      )

      .subscribe(res => {
        this.images = res;
      });
  }

  ngOnInit() {
  }



}
