import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public type: 'users' | 'hospitals' | 'medics';
  public id: string;
  public img: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>()

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: 'users' | 'hospitals' | 'medics', id: string, img: string = 'no-image') {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${type}/${img}`;
    }
    console.log(this.img);
    
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
