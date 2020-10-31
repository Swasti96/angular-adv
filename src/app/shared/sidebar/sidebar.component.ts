import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // menuItems: any[];
  user: User

  constructor(public sidebarService: SidebarService, private userService: UserService) {

    // this.menuItems = sidebarService.menu;
    this.user = userService.user

  }

  ngOnInit(): void {
  }

}
