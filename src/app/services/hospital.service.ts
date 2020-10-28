import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  getHospitals() {
    return this.http.get(`${base_url}/hospitals`, this.headers)
      .pipe(
        map((resp: { hospitals: Hospital[] }) => resp.hospitals
        )
      )
  }

  createHospital(name: string) {
    return this.http.post(`${base_url}/hospitals/add-hospital`, { name }, this.headers)
  }

  updateHospital(_id: string, name: string) {
    return this.http.put(`${base_url}/hospitals/update-hospital/${_id}`, { name }, this.headers)
  }

  removeHospital(_id: string) {
    return this.http.delete(`${base_url}/hospitals/remove-hospital/${_id}`, this.headers)
  }

}
