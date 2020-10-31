import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.models';
import { Medic } from 'src/app/models/medic.model';
import { User } from 'src/app/models/user.models';
import { SeekerService } from 'src/app/services/seeker.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activaredRoute: ActivatedRoute, private seekerService: SeekerService) { }

  ngOnInit(): void {

    this.activaredRoute.params
      .subscribe(({ term }) => {
        this.globalSearch(term);
      })

  }

  globalSearch(term: string) {
    this.seekerService.globalSearch(term)
      .subscribe(({ user, hospital, medic }: any) => {

        this.users = user;
        this.hospitals = hospital;
        this.medics = medic

      })
  }

}
