import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProductComponent } from './components/registerProduct/registerProduct.component';
import { ListProductComponent } from './components/listProduct/listProduct.component';
import { UpdateProductComponent } from './components/updateProduct/updateProduct.component';
import { ViewproductsComponent } from './components/viewproducts/viewproducts.component';
import { AdminComponent } from './components/admin/admin.component';
import { SlideimagesComponent } from './components/slideimages/slideimages.component';
import { VerticalItemsComponent } from './components/verticalItems/verticalItems.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'productos',
    pathMatch: "full"
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
    component: RegisterProductComponent
  },
  {
    path:'editar/:id',
    component:UpdateProductComponent
  },
  {
    path:'all-products',
    component: ViewproductsComponent
  },
  {
    path:'admin',
    component: AdminComponent
  },
  {
    path: "slides/:action",
    component: SlideimagesComponent    
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
