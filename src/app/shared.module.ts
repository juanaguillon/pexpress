import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SanitizeHTMLPipe } from './shared/sanitizeHTML.pipe';
import { getFirstWordPipe } from './shared/getFirstWord.pipe';

@NgModule({
  declarations: [
    SanitizeHTMLPipe,
    getFirstWordPipe
  ],
  imports: [ 
    CommonModule, 
    BrowserModule 
  ],
  exports: [
    SanitizeHTMLPipe,
    getFirstWordPipe
  ],
  providers: [],
})
export class SharedModule {}