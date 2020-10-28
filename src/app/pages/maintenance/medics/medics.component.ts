import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medic } from 'src/app/models/medic.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SeekerService } from 'src/app/services/seeker.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})

export class MedicsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public medics: Medic[] = [];
  public imageSubs: Subscription;

  constructor(private medicService: MedicService, private seekerService: SeekerService, public modalImageService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getMedics();

    this.imageSubs = this.modalImageService.newImage
      .pipe(
        delay(1000)
      )
      .subscribe(img => {
        this.getMedics()
      })
  }

  getMedics() {
    this.loading = true;
    this.medicService.getMedics()
      .subscribe((resp: any) => {
        this.medics = resp.medics
        this.loading = false;
        // console.log(resp.medics);
      })
  }

  searchMedics(term: string) {

    if (term.trim().length === 0) {
      this.getMedics();
    }

    this.seekerService.searchUsers('medics', term)
      .subscribe((resp: Medic[]) => {
        this.medics = resp
      })
  }

  openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic._id, medic.img);
  }

  removeMedic(medic: Medic) {

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
        this.medicService.removeMedic(medic._id)
          .subscribe(resp => {
            Swal.fire(
              'Deleted!',
              `${medic.name} has been deleted.`,
              'success'
            )
            this.getMedics()
          })
      }
    })

  }


}
