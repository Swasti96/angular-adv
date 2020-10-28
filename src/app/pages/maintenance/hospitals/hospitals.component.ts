import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.models';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SeekerService } from 'src/app/services/seeker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})

// TODO: Implementar paginacion
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imageSubs: Subscription;

  constructor(private hospitalService: HospitalService, private modalImageService: ModalImageService, private seekerService: SeekerService) { }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitals();

    this.imageSubs = this.modalImageService.newImage
      .pipe(
        delay(1000)
      )
      .subscribe(img => {
        this.getHospitals()
      })
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
      })
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital._id, hospital.name)
      .subscribe(resp => {
        Swal.fire('Updated', hospital.name, 'success');
      });
  }

  removeHospital(hospital: Hospital) {
    this.hospitalService.removeHospital(hospital._id)
      .subscribe(resp => {
        this.getHospitals();
        Swal.fire('Removed', hospital.name, 'success');
      });
  }

  async createHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Add Hospital',
      text: 'Enter the name of the new hospital',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    })

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value)
        .subscribe((resp: any) => {
          this.hospitals.push(resp.newHospital)
          console.log(resp.newHospital);

        })
    }
    // console.log(value);
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }

  searchHospitals(term: string) {

    if (term.trim().length === 0) {
      return this.getHospitals();
    }

    this.seekerService.searchUsers('hospitals', term)
    .subscribe((resp:Hospital[]) => {
      this.hospitals = resp;
    })
    
  }

}
