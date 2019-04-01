import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EditComponent } from './edit.component';


import { EditComboComponent } from './editCombo/editCombo.component';
import { EditMenuComponent } from './editMenu/editMenu.component';
import { EditEjecutiveComponent } from './editEjecutive/editEjecutive.component';
import { EditPresetComponent } from './editPreset/editPreset.component';
import { SanitizeHTMLPipe } from 'src/app/shared/sanitizeHTML.pipe';

const routes: Routes = [
  {
    path: 'screentwo/editing',
    component: EditComponent,
    children: [
      {
        path: 'menu/:id',
        component: EditMenuComponent
      },
      {
        path: 'combo/:id',
        component: EditComboComponent
      },
      {
        path: 'ejec/:id',
        component: EditEjecutiveComponent
      },
      {
        path: 'preset/:id',
        component: EditPresetComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [    
    EditComboComponent,
    EditMenuComponent,
    EditEjecutiveComponent,
    EditPresetComponent,
    EditComponent,
    SanitizeHTMLPipe
  ],
  exports: [
    SanitizeHTMLPipe
  ],
  bootstrap: [EditComponent]
})
export class EditModule { }
