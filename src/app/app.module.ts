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

/** Modulos personalizados */
import { AdminModule } from './components/admin/admin.module';
import { ScreenTwoModule } from './components/screen-two/screen-two.module';

/** Componenetes */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterProductComponent } from './components/registerProduct/registerProduct.component';
import { ListProductComponent } from './components/screenfull/listProduct/listProduct.component';
import { UpdateProductComponent } from './components/updateProduct/updateProduct.component';
import { ViewproductsComponent } from './components/viewproducts/viewproducts.component';
import { SlideimagesComponent } from './components/slideimages/slideimages.component';
import { LoginComponent } from './components/login/login.component';
// import { ScreensvModule } from './components/screenfull/screensv/screensv.module';
import { ScreenFullComponent } from './components/screenfull/screenfull.component';

// Directives

// Environment
import { environment } from '../environments/environment'; 
import { ScreenFullModule } from './components/screenfull/screenfull.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterProductComponent,
    ListProductComponent,
    UpdateProductComponent,
    ViewproductsComponent,
    SlideimagesComponent,
    LoginComponent,
    ScreenFullComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp( environment.fireabase ),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    OwlModule,
    AdminModule,
    ScreenTwoModule,
    ScreenFullModule
    // ScreensvModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
