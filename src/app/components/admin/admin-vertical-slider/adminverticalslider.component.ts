import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminverticalslider',
  templateUrl: './adminverticalslider.component.html',
  styleUrls: ['./adminverticalslider.component.css']
})
export class AdminVerticalSliderComponent implements OnInit {
  sliders;
  currentSlide = {
    id: null,
    name: "",
    image: {},
    price: null
  }

  constructor(
    private slide: SlideService,
  ) {

    this.slide.getAllDocs().subscribe(response => {
      this.sliders = response.map(data => data.payload.doc.data());
    })
  }

  ngOnInit() { }

  generateImage($e) {
    this.currentSlide.image = $e.target.files[0];
  }

  generateSlider(e) {
    e.preventDefault()
    if (!this.currentSlide.image || !this.currentSlide.name || !this.currentSlide.price) {
      alert('Todos los campos son requeridos');
      return false;
    }


    let idImage = new Date().getTime();
    this.slide.uploadImage(idImage, this.currentSlide.image)
      .then(() => {
        let data = {
          id: idImage,
          name: this.currentSlide.name,
          price: this.currentSlide.price
        }
        this.slide.saveDocument2(idImage, data).then(() => {
          alert('Slide creado correctamente');
        })
      })
      .catch(err => {
        alert('Error al crear slide');
        console.log(err);
      })
  }
}
