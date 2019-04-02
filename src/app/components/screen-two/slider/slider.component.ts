import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  increate: string;
  sliders;
  currentSlide = {
    id: null,
    name: "",
    image: {}
  }

  constructor(
    private slide: SlideService,
    private route: ActivatedRoute
  ) {

    this.increate = this.route.snapshot.params["action"];
    this.slide.getAllDocs().subscribe(response => {
      this.sliders = response.map(data => data.payload.doc.data());
    })
  }

  ngOnInit() { }

  generateImage($e) {
    this.currentSlide.image = $e.target.files[0];
  }

  generateSlider() {
    if (!this.currentSlide.image || !this.currentSlide.name) {
      alert('Todos los campos son requeridos');
      return false;
    }


    let idImage = new Date().getTime();
    this.slide.uploadImage(idImage, this.currentSlide.image)
      .then(() => {
        let data = {
          id: idImage,
          name: this.currentSlide.name
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
