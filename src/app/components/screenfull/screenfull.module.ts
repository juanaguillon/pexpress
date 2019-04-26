import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';

import { ScreensvModule } from './screensv/screensv.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
  ],
  imports: [ 
    CommonModule,
    BrowserModule,
    ScreensvModule
   ],
  exports: [
    ScreensvModule,
    SlickCarouselModule
  ],
  providers: [],
})
export class ScreenFullModule {}