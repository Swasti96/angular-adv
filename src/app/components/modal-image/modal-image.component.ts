import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})

export class ModalImageComponent implements OnInit {

  public image: File;
  public imageTemp: any = null;

  constructor(public modalImageService: ModalImageService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imageTemp = null;
    this.modalImageService.closeModal();
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatedImage(this.image,type,id)
      .then(img => {
        Swal.fire('Saved', 'Image updated', 'success');
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      }).catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Cant upload image', 'error')
      })
  }


}
