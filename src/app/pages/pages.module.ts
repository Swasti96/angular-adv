import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//common incluye las directa del ngfor y el ngif, entre otras cosas

//Modulo
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

//Import componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
