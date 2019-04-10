import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalItemsComponent } from './verticalItems/verticalItems.component';
import { VerticalItems2Component } from './verticalitems2/verticalitems2.component';
import { OwlModule } from 'ngx-owl-carousel';
import { ScreensvComponent } from './screensv.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    VerticalItemsComponent,
    VerticalItems2Component,
    ScreensvComponent    
  ],
  imports: [
    CommonModule,
    OwlModule,
    SharedModule
  ]
})
export class ScreensvModule { }
