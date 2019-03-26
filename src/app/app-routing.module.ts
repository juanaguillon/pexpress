import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProductComponent } from './components/registerProduct/registerProduct.component';
import { ListProductComponent } from './components/listProduct/listProduct.component';
import { UpdateProductComponent } from './components/updateProduct/updateProduct.component';
import { ViewproductsComponent } from './components/viewproducts/viewproducts.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'productos',
    pathMatch: "full"
  },
  {
    path: 'nuevo-producto',
    component: RegisterProductComponent
  },
  {
  	path:'productos',
  	component: ListProductComponent
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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
