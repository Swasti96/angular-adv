import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    this.setThemeColor();

  }

  setThemeColor(){
    const defaultTheme = "./assets/css/colors/purple.css";
    const url = localStorage.getItem('theme') || defaultTheme;
    this.linkTheme.setAttribute('href', url);
  }

  changeThemeColor( theme: string ){

    const url = `./assets/css/colors/${ theme }.css`;
    
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');
    links.forEach(element => {

      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (currentTheme === btnUrl) {
        element.classList.add('working');
      }

    });

  }
}
