import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//Import components
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //Redirecciona a nuestro dashboard ( Home )
  { path: '**', component: NopagefoundComponent }, //Cualquier ruta que no este definida en nuestras rutas, va a mostrar pageNotFound

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
