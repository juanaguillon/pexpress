import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProductComponent } from './components/registerProduct/registerProduct.component';
import { ListProductComponent } from './components/listProduct/listProduct.component';
import { UpdateProductComponent } from './components/updateProduct/updateProduct.component';
import { ViewproductsComponent } from './components/viewproducts/viewproducts.component';
import { SlideimagesComponent } from './components/slideimages/slideimages.component';
import { VerticalItemsComponent } from './components/verticalItems/verticalItems.component';
import { LoginComponent } from './components/login/login.component';

// Rutas de modulos
import { adminRoutes } from './components/admin/admin.module'

import { AuthGuard } from './services/auth.guard';
import { NoauthGuard } from './services/noauth.guard';
import { ScreenTwoComponent } from './components/screen-two/screen-two.component';
import { VerticalItems2Component } from './components/verticalitems2/verticalitems2.component';


const routes: Routes = [
  {
    path:'',
    redirectTo: 'productos',
    pathMatch: "full"
  },
  {
    path:'login',
    component: LoginComponent,
    canActivate: [ NoauthGuard ]
  },
  {
    path:'productos',
    component: ListProductComponent
  },
  {
    path:'verticalproductos',
    component: VerticalItemsComponent
  },
  {
    path: 'nuevo-producto',
    component: RegisterProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'editar/:id',
    component:UpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'all-products',
    component: ViewproductsComponent,
    canActivate: [AuthGuard]  
  },  
  {
    path: "slides/:action",
    component: SlideimagesComponent,
    canActivate: [AuthGuard]    
  },
  {
    path: 'screentwo',
    component: ScreenTwoComponent,
    canActivate: [AuthGuard]   
  },
  {
    path: 'verticalproducts2',
    component: VerticalItems2Component
  }
  
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes ),
    RouterModule.forRoot( routes ,{ useHash: true })
  ],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
