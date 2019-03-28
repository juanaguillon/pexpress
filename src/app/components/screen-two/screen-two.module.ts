import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ScreenTwoComponent } from './screen-two.component';

const screenTwoRoutes:Routes = [
  {
    
  }
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ScreenTwoComponent
  ]
})
export class ScreenTwoModule { }
