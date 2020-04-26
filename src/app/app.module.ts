import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ProductoService} from './services/producto.service';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import {CategoriaService} from './services/categoria.service';
import { EditCatComponent } from './components/categorias/edit-cat/edit-cat.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { CreateCatComponent } from './components/categorias/create-cat/create-cat.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ClientesComponent } from './components/clientes/clientes.component';
import {ClienteService} from './services/cliente.service';
import { ClienteNewComponent } from './components/clientes/cliente-new/cliente-new.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import {VentasService} from './services/ventas.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductoIndexComponent,
    SidebarComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    CategoriasComponent,
    EditCatComponent,
    CreateCatComponent,
    ClientesComponent,
    ClienteNewComponent,
    ClienteEditComponent,
    UserComponent,
    UserEditComponent,
    UserNewComponent,
    VentasComponent,
    VentaCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [
    ProductoService,
    CategoriaService,
    ClienteService,
    VentasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
