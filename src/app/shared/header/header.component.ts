import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

  globalSearch(value: string) {
    // console.log(value);
    if (value.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/search/${value}`);
  }

}
