import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/'},
  //       { titulo: 'ProgressBar', url: '/dashboard/progress'},
  //       { titulo: 'Gráficas', url: '/dashboard/charts'},
  //       // { titulo: 'Promesas', url: '/dashboard/promesas'},
  //       // { titulo: 'Rxjs', url: '/dashboard/rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Maintenance',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'User', url: '/dashboard/users'},
  //       { titulo: 'Hospitals', url: '/dashboard/hospitals'},
  //       { titulo: 'Medics', url: '/dashboard/medics'},
  //     ]
  //   }
  // ]


  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
