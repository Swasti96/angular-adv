import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from 'src/app/models/user.models';

import { SeekerService } from 'src/app/services/seeker.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public pageNumber: number = 0;
  public loading: boolean = true;
  public imageSubs: Subscription;

  constructor(private userService: UserService, private seekerService: SeekerService, private modalImageService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.getUsers()

    this.imageSubs = this.modalImageService.newImage
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.getUsers()
      })

  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.pageNumber)
      .subscribe(({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      })
  }

  changePage(value: number) {
    this.pageNumber += value

    if (this.pageNumber < 0) {
      this.pageNumber = 0
    } else if (this.pageNumber > this.totalUsers) {
      // this.pageNumber = this.totalUsers
      this.pageNumber -= value
    }

    this.getUsers()

  }

  searchUser(term: string) {

    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.seekerService.searchUsers('users', term)
      .subscribe(resp => {
        this.users = resp
      })
  }

  deleteUser(user: User) {

    if (user._id === this.userService.uid) {
      return Swal.fire('Error', "You can't erase yourself, are you okay?", 'error');
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
          .subscribe(resp => {
            Swal.fire(
              'Deleted!',
              `${user.name} has been deleted.`,
              'success'
            )
            this.getUsers()
          })
      }
    })
  }

  changeRol(user: User) {

    this.userService.saveUser(user)
      .subscribe(resp => {
        console.log(resp);

      })
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user._id, user.img);
    // console.log(user);

  }

}



