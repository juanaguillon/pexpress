import { Component, OnInit } from '@angular/core';
import { SlideService } from '../../services/slide.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-slideimages',
  templateUrl: './slideimages.component.html',
  styleUrls: ['./slideimages.component.css']
})
export class SlideimagesComponent implements OnInit {

  increate:string;
  sliders;
  currentSlide = {
    id: null,
    name: "",
    image: {},
    price: null    
  }

  constructor(
    private slide: SlideService,
    private route: ActivatedRoute
  ) { 

    this.increate = this.route.snapshot.params["action"];    
    this.slide.getAllDocs().subscribe( response => {
      this.sliders = response.map( data => data.payload.doc.data() );
    })
  }

  ngOnInit() {}

  generateImage( $e ){
    this.currentSlide.image = $e.target.files[0];
  }

  generateSlider( e ){
    e.preventDefault()
    if (!this.currentSlide.image || !this.currentSlide.name || !this.currentSlide.price){
      alert('Todos los campos son requeridos');
      return false;
    }


    let idImage = new Date().getTime();     
    this.slide.uploadImage( idImage, this.currentSlide.image )
    .then( () => {
      let data = {
        id: idImage,
        name: this.currentSlide.name,
        price: this.currentSlide.price
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
  
  deleteSlide(id) {
    this.slide.deleteSlide1(id);
  }



}
