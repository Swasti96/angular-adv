import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.models';
import { Medic } from 'src/app/models/medic.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  public medicForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital;
  public selectedMedic: Medic;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicSerive: MedicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.getMedicById(id));

    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.getHospitals();

    this.medicForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.selectedHospital = this.hospitals.find(hospital => hospital._id === hospitalId);
      })

  }

  getMedicById(id: string) {

    if (id === 'new-medic') {
      return;
    }

    this.medicSerive.getMedicById(id)
      .pipe(
        delay(100)
      )
      .subscribe((resp: any) => {
        
        const { name, hospital: { _id } } = resp.medic;
        // console.log(name, _id);
        this.selectedMedic = resp.medic;
        this.medicForm.setValue({ name, hospital: _id });

      })
  }

  getHospitals() {
    this.hospitalService.getHospitals()
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      })
  }

  createMedic() {
    const { name } = this.medicForm.value;

    // console.log(this.selectedMedic);
    if (this.selectedMedic) {
      
      const medic = {
        ...this.medicForm.value,
        _id: this.selectedMedic._id
      }
      
      this.medicSerive.updateMedic(medic)
      .subscribe(resp => {
        console.log(resp)
        Swal.fire('Success', `Medic ${name} updated`, 'success')
      })
      
    } else {

      this.medicSerive.createMedic(this.medicForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Success', `Medic ${name} created`, 'success')
          this.router.navigateByUrl(`/dashboard/medic/${resp.newMedic._id}`)
        })

    }

  }

}
