import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatedImage(file: File, type: 'users' | 'medics' | 'hospitals', id: string) {

    try {

      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data) {
        return data.fileName
      } else {
        console.log(data.msg);
        return false
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
