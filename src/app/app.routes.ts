import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCreateEditComponent } from './components/product-create-edit/product-create-edit.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'product-create-edit', component: ProductCreateEditComponent },
    { path: 'product-create-edit/:id', component: ProductCreateEditComponent },
    { path: 'products', component: ProductsComponent }];


@NgModule({
    imports: [RouterModule.forRoot(routes)],  // Configura las rutas en el módulo principal
    exports: [RouterModule]
})
export class AppRoutingModule { }