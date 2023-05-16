import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {PricesService} from 'src/app/services/prices-service.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-medical-visit',
  templateUrl: './medical-visit.component.html',
  styleUrls: ['./medical-visit.component.css'],
  providers: [DatePipe]
})
export class MedicalVisitComponent implements OnInit {

  result;
  procedures;
  listOfHours: any;
  date: Date;
  defaultDoctor: any = -1;

  submitted = false;
  error = false;
  success = false;
  medicalVisit = new FormGroup({
    doctor_id: new FormControl(''),
    day: new FormControl(new Date()),
    visit_start: new FormControl(''),
    id_procedure: new FormControl(),
    patient_id: new FormControl(this.token.getUser().body.patient.id)
  })

  constructor(private httpClient: HttpClient, private pricesService: PricesService, private token: TokenStorageService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
  }

  get f() {
    return this.medicalVisit.controls;
  }

  ngOnInit(): any {
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 1);
    this.httpClient.get("http://localhost:8080/getDoctorList").subscribe(resp => {
      this.result = resp;


      this.httpClient.get("http://localhost:8080/getMedicalProcedures/" + resp[0]["id"]).subscribe(resp => {
        this.procedures = resp
        this.medicalVisit = this.formBuilder.group({
          day: [this.datePipe.transform(this.date, 'yyyy-MM-dd'), Validators.required],
          visit_start: ['', Validators.required],
          doctor_id: ['', Validators.required,],
          id_procedure: [resp[0]["id"], Validators.required],
          patient_id: new FormControl(this.token.getUser().body.patient.id, Validators.required)
        });
        this.medicalVisit.controls['doctor_id'].setValue(resp[0]["id"]);
        this.somethingChanged();
      });

    });


  }

  somethingChanged() {
    this.httpClient.post("http://localhost:8080/patient/getDoctorHours", this.medicalVisit.getRawValue()).subscribe(resp => {
      this.listOfHours = resp
      console.log(resp);
    });
  }

  sendVisitRequest() {

    this.submitted = true;
    if (this.medicalVisit.invalid) {
      this.error = true;
      this.success = false;
    } else {
      this.httpClient.post("http://localhost:8080/patient/registerVisit", this.medicalVisit.getRawValue()).subscribe(err =>
        error => this.success = false);
      this.medicalVisit.reset();
      this.medicalVisit.setErrors({'invalid': true});
      this.submitted = false;
      this.error = false;
      this.success = true;
    }
  }

}
