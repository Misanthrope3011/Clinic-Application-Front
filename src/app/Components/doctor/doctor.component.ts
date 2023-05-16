import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientManagerService} from '../../services/patient-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MessageSentComponent} from '../Popups/message-sent/message-sent.component';
import {DoctorManagerService} from 'src/app/services/doctor-manager.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit, OnDestroy {

  page: any;
  PESEL: string = '';
  patients: any;
  role: any;
  numberOfItemsOnPage: string;
  numberOfPatients: number;
  numberOfPages: number;
  tempArray;

  constructor(private patientManager: PatientManagerService, private doctorManagerService: DoctorManagerService, private router: Router, private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params['page'];
    });

  }

  ngOnInit(): void {


    if (window.localStorage.getItem('numberOfItemsOnPage') === null) {
      this.numberOfItemsOnPage = "5";
      window.localStorage.setItem('numberOfItemsOnPage', JSON.stringify(this.numberOfItemsOnPage));
    } else {
      this.numberOfItemsOnPage = JSON.parse(window.localStorage.getItem('numberOfItemsOnPage'));
    }


    this.doctorManagerService.getNumberOfPatients().subscribe(result => {
      this.numberOfPatients = result.body;
      this.numberOfPages = Math.ceil(this.numberOfPatients / parseInt(this.numberOfItemsOnPage));

      this.tempArray = Array(this.numberOfPages).fill(0).map((x, i) => i);
    });


    const user = JSON.parse(window.localStorage.getItem('auth-user'));
    this.role = user.body.roles[0] == "ROLE_DOCTOR";

    this.doctorManagerService.changeNumberOfElementsDisplayed(this.numberOfItemsOnPage, this.page).subscribe(err => {
      this.patients = err.content;

    });

  }

  deletePatient(patient: number) {
    this.patientManager.deletePatient(patient).subscribe(err => {
      err.body
    });
    this.matDialog.open(MessageSentComponent);
  }

  fetchPatient(id: number) {
    this.patientManager.getPatient(id).subscribe(err => {
      window.localStorage.setItem('fetchedPatient', JSON.stringify(err.body));
      this.router.navigate(['/doctor/board/edit/' + id]);
    });
  }

  findUserByPESEL() {
    console.log(this.PESEL);
    return this.doctorManagerService.findUserByPESEL(this.PESEL)
      .subscribe(err => this.patients = err.body);
  }

  changeNumberOfElements() {
    window.localStorage.setItem('numberOfItemsOnPage', this.numberOfItemsOnPage);
    this.ngOnInit();
  }

  ngOnDestroy() {

  }


}
