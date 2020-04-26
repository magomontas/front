import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProductoIndexComponent} from './components/productos/producto-index/producto-index.component';
import {ProductoCreateComponent} from './components/productos/producto-create/producto-create.component';
import {ProductoEditComponent} from './components/productos/producto-edit/producto-edit.component';
import {CategoriasComponent} from './components/categorias/categorias.component';
import {EditCatComponent} from './components/categorias/edit-cat/edit-cat.component';
import {CreateCatComponent} from './components/categorias/create-cat/create-cat.component';
import {ClientesComponent} from "./components/clientes/clientes.component";
import {ClienteNewComponent} from "./components/clientes/cliente-new/cliente-new.component";
import {ClienteEditComponent} from "./components/clientes/cliente-edit/cliente-edit.component";
import {UserComponent} from "./components/user/user.component";
import {UserEditComponent} from "./components/user/user-edit/user-edit.component";
import {UserNewComponent} from "./components/user/user-new/user-new.component";
import {VentasComponent} from "./components/ventas/ventas.component";
import {VentaCreateComponent} from "./components/ventas/venta-create/venta-create.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logout/:id', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'productos', component: ProductoIndexComponent},
  {path: 'producto/registrar', component: ProductoCreateComponent},
  {path: 'producto/editar/:id', component: ProductoEditComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'categoria/crear', component: CreateCatComponent},
  {path: 'categoria/editar/:id', component: EditCatComponent},
  {path: 'categoria/eliminar/:id', component: EditCatComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'cliente/create', component: ClienteNewComponent},
  {path: 'cliente/editar/:id', component: ClienteEditComponent},
  {path: 'usuario/editar/:id', component: UserEditComponent},
  {path: 'usuarios', component: UserComponent},
  {path: 'usuario/create', component: UserNewComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'venta/create', component: VentaCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
