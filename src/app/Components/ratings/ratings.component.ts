import {Component, OnInit} from '@angular/core';
import {DoctorManagerService} from 'src/app/services/doctor-manager.service';
import {TokenStorageService} from 'src/app/services/tokenstorage.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  doctors: any;
  ratingDTO = new FormGroup({
    rateId: new FormControl(''),
    rating: new FormControl(''),
    patient_id: new FormControl(''),
    doctor_id: new FormControl('')
  });

  constructor(private doctorManager: DoctorManagerService, private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.doctorManager.getDoctors().subscribe(err => {
      this.doctors = err;

      this.doctorManager.getRating().subscribe(err => {

        for (let i = 0; i < this.doctors.length; i++) {
          this.doctors[i].averageRatings = err[i];
        }
      })

      this.doctorManager.getUserRates(this.tokenStorage.getUser().body.patient.id).subscribe(
        err => {
          for (let i = 0; i < this.doctors.length; i++) {
            if (err[i] != null) {
              this.doctors[i].rating = err[i].rating;
              this.doctors[i].rateId = err[i].id;
            } else {
              this.doctors[i].rating = 0;
              this.doctors[i].rateId = -1;
            }
          }
        }
      )
    });
  }

  changeRate(index: number) {

    this.ratingDTO = this.formBuilder.group({
      rateId: [this.doctors[index].rateId],
      rate: [parseFloat(this.doctors[index].rating)],
      patient_id: [this.tokenStorage.getUser().body.patient.id],
      doctor_id: [this.doctors[index].id],
    });

    this.doctorManager.updateRate(this.doctors[index].rateId, this.ratingDTO)
      .subscribe(err => console.log(err));

  }

}
