import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-vertical',
  templateUrl: './pantalla-vertical.component.html',
  styleUrls: ['./pantalla-vertical.component.css']
})
export class PantallaVerticalComponent implements OnInit {

  data = []
  data2 = []
  
  constructor() {
    this.data = [
      {
        title: 'Hamburguesa',
        image: 'assets/images/foto_1.jpg',
        price: 21000
      },
      {
        title: 'Churrasco',
        image: 'assets/images/foto_9.jpg',
        price: 22000
      }
    ]

    this.data2 = [
      {
        title: 'Hamburguesa 2',
        image: 'assets/images/foto_1.jpg',
        price: 12000
      },
      {
        title: 'Churrasco 2',
        image: 'assets/images/foto_9.jpg',
        price: 32000
      }
    ]

    let s = [
      {
        title: 'Hamburguesa 2',
        image: 'assets/images/foto_1.jpg',
        price: 12000
      },
      {
        title: 'Churrasco 2',
        image: 'assets/images/foto_9.jpg',
        price: 32000
      }
    ]
    let r = [
      {
        title: 'Hamburguesa',
        image: 'assets/images/foto_1.jpg',
        price: 21000
      },
      {
        title: 'Churrasco',
        image: 'assets/images/foto_9.jpg',
        price: 22000
      }
    ]
    let f = this.intersect(s, r)
    console.log(f);
    
    
  }


  ngOnInit(): void {
    
  }

  intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
      return b.indexOf(e) > -1;
    });
  }
}
