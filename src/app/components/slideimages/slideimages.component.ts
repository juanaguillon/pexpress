import { Component, OnInit } from '@angular/core';
import { SlideService } from '../../services/slide.service';
import { Slider } from '../../shared/slider';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-slideimages',
  templateUrl: './slideimages.component.html',
  styleUrls: ['./slideimages.component.css']
})
export class SlideimagesComponent implements OnInit {

  increate:string;
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

  }

  ngOnInit() {}

  generateImage( $e ){
    this.currentSlide.image = $e.target.files[0];
  }

  generateSlider( ){
    if ( ! this.currentSlide.image || ! this.currentSlide.name ){
      alert('Todos los campos son requeridos');
      return false;
    }


    let idImage = new Date().getTime();     
    this.slide.uploadImage( idImage, this.currentSlide.image )
    .then( () => {
      let data = {
        id: idImage,
        name: this.currentSlide.name
      }
      this.slide.saveDocument( idImage, data ).then( ( ) => {
        alert('Slide creado correctamente');
      } )
    } )
    .catch( err  => {
      alert('Error al crear slide');
      console.log( err );
    })
  }



}
