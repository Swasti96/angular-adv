import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Hospital } from '../models/hospital.models';
import { Medic } from '../models/medic.model';
import { User } from '../models/user.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class SeekerService {


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

  private transformUser(result: any[]): User[] {

    return result.map(
      user => new User(user.name, user.email, '', user.img, user.rol, user.google, user._id)
    )
  }

  private transformHospital(result: any[]): Hospital[] {
    return result
  }

  private transformMedic(result: any[]): Medic[] {
    return result
  }

  searchUsers(type: 'users' | 'medics' | 'hospitals', term: string) {
    return this.http.get<any[]>(`${base_url}/all/seeker/${type}/${term}`, this.headers)
      .pipe(
        map((resp: any) => {

          switch (type) {
            case 'users':
              return this.transformUser(resp.result);

            case 'hospitals':
              return this.transformHospital(resp.result);

            case 'medics':
              return this.transformMedic(resp.result);
            default:
              return []
          }

        })
      )
  }

}
