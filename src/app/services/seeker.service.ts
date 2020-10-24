import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  searchUsers(type: 'users' | 'medics' | 'hospitals', term: string) {
    return this.http.get<any[]>(`${base_url}/all/seeker/${type}/${term}`, this.headers)
      .pipe(
        map((resp: any) => {

          switch (type) {
            case 'users':
              // const usersTranform = resp.result.map(user => new User(user.name, user.email, '', user.img, user.rol, user.google, user._id))
              // return usersTranform
            return this.transformUser(resp.result)

            default:
              return []
          }

        })
      )
  }

}
