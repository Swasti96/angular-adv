import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medic } from '../models/medic.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getMedics() {
    return this.http.get(`${base_url}/medics`,this.headers);
  }

  getMedicById(_id : string){
    return this.http.get(`${base_url}/medics/${_id}`,this.headers);
  }

  createMedic(medic: { name: string, hospital: string }) {
    return this.http.post(`${base_url}/medics/add-medic`, medic, this.headers);
  }

  updateMedic(medic: Medic) {
    // console.log(medic._id);
    return this.http.put(`${base_url}/medics/update-medic/${medic._id}`, medic, this.headers);
  }

  removeMedic(_id: string) {
    return this.http.delete(`${base_url}/medics/remove-medic/${_id}`, this.headers);
  }
}
