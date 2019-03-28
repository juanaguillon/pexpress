/** Importaciones para actual Modulo */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/** Módulos NodeJS */
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { OwlModule } from 'ngx-owl-carousel';

/** Componenetes */
import { AdminComponent } from './components/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterProductComponent } from './components/registerProduct/registerProduct.component';
import { ListProductComponent } from './components/listProduct/listProduct.component';
import { UpdateProductComponent } from './components/updateProduct/updateProduct.component';
import { ViewproductsComponent } from './components/viewproducts/viewproducts.component';
import { SlideimagesComponent } from './components/slideimages/slideimages.component';
import { VerticalItemsComponent } from './components/verticalItems/verticalItems.component';


// Environment
import { environment } from '../environments/environment'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterProductComponent,
    ListProductComponent,
    UpdateProductComponent,
    ViewproductsComponent,
    AdminComponent,
    SlideimagesComponent,
    VerticalItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.fireabase ),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
