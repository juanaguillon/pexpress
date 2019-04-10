import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  increate: string;

  currentImages = [];
  currentImagesStatus = false;
  sliders;
  currentSlide = {
    id: null,
    name: "",
    image: {}
  }

  constructor(
    private slide: SlideService,
    private route: ActivatedRoute,
    private storage:StorageService,
    private db:DatabaseService
  ) {

    this.increate = this.route.snapshot.params["action"];
    this.slide.getAllDocs().subscribe(response => {
      this.sliders = response.map(data => data.payload.doc.data());
    })

    this.sliderDocs()
  }

  ngOnInit() { }

  deteleImage( url:string ){
    
    let result = this.storage.deleteImageByUrl(url)
    
    result.delete()
      .then(succ => {
        this.db.deleteDocumentById( 'slide2', parseInt(result.name) )
        .then( rs => {
          alert('Imágen eliminada correctamente');
        })
        
      })
      .catch(err => {
        alert('Error en eliminar el archivo.');
        console.log(err);
      })
  }

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

  private sliderDocs() {
    const completeSubs = ( ) => {
      this.currentImagesStatus = true;
    }
    
    this.slide.getSliderTwoDocs().subscribe(images => {
      this.currentImages = images;
      completeSubs();
    } )
  }
  

}
