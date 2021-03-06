/** Importaciones para actual Modulo */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule} from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminListingComponent } from './admin-listing/admin-listing.component';
import { AdminScreenOneComponent } from './admin-screen-one/admin-screen-one.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { AdminVerticalSliderComponent } from './admin-vertical-slider/adminverticalslider.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: 'listing',
        pathMatch: "full"
      },
      {
        path: 'listing',
        component: AdminListingComponent,
      },
      {
        path: "screen-one",
        component: AdminScreenOneComponent
      },
      {
        path:"vertical-slider",
        component: AdminVerticalSliderComponent
      }     

    ]
  }
]

@NgModule({
  declarations: [
    AdminListingComponent,
    AdminComponent,
    AdminScreenOneComponent,
    AdminVerticalSliderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule { }