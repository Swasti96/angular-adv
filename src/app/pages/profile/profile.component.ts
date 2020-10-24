import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {


  public profileForm: FormGroup;
  public user: User;
  public image: File;
  public imageTemp: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

  }

  updateProfile() {
    // console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value).subscribe(resp => {
      console.log(resp);
      const { name, email } = this.profileForm.value;
      this.user.name = name;
      this.user.email = email;

      Swal.fire('Saved', 'Profile updated', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  }

  //Seteo lo que recibo como target del event en mi propiedad image
  changeImage(file: File) {
    this.image = file;

    if (!file) {
      return this.imageTemp = null;
    }

    const reader = new FileReader;
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    }
  }

  //Subir imagen
  uploadImage() {
    this.fileUploadService.updatedImage(this.image, 'users', this.user._id)
      .then(img => {
        this.user.img = img
        Swal.fire('Saved', 'Image updated', 'success');
      }).catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Cant upload image', 'error')
      })
  }

}
