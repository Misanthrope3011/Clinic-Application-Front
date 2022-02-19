import { Component, OnInit } from '@angular/core';
import { PatientManagerService } from 'src/app/services/patient-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DoctorManagerService } from 'src/app/services/doctor-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { VisitDeletedComponent } from '../Popups/visit-deleted/visit-deleted.component';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-display-visit',
  templateUrl: './display-visit.component.html',
  styleUrls: ['./display-visit.component.css']
})
export class DisplayVisitComponent implements OnInit {

  pending: any;
  history: any;  
  role: boolean;
  showHistory: boolean = true;
  showPending: boolean = true; 
  selectedModel: string;


  constructor(private patientManager: PatientManagerService, private activatedRoute: ActivatedRoute, private doctorManager: DoctorManagerService, private matDialog: MatDialog) { }

  ngOnInit(): any {


    const user = JSON.parse(localStorage.getItem('auth-user'));
    this.role = user.body.roles[0] == "ROLE_DOCTOR";

    if (this.activatedRoute.snapshot.url[2]?.path == "displayVisit") {
      this.patientManager.getVisits(parseInt(this.activatedRoute.snapshot.url[3].path)).subscribe(err => {this.pending = err["body"]["Oczekujace"]
        this.history = err["body"]["Historia"];
        console.log(err);
      });
    } else if(this.activatedRoute.snapshot.url[0].path == "doctor" && this.activatedRoute.snapshot.url[1].path == "getAbandoned" ) {
      this.patientManager.getAbandonRequest().subscribe(err => {this.pending = err["body"]
        console.log(err);
      });

    } else
    if (this.activatedRoute.snapshot.url[0].path == "patient") {
      this.patientManager.getVisits(user.body.patient.id).subscribe(err => {this.pending = err["body"]["Oczekujace"]
        this.history = err["body"]["Historia"]


        });
    } else 
    if (this.activatedRoute.snapshot.url[0].path == "doctor") {
      this.doctorManager.displayVisits(user.body.doctor.id, this.activatedRoute.queryParams["_value"].page, this.activatedRoute.queryParams["_value"].size).subscribe(err => {
        console.log(err);
        this.pending = err["body"]["Oczekujace"];
        this.history = err["body"]["Historia"];
     
      });

    }
  }

  deleteVisit(id: number) {
    this.doctorManager.abandonVisit(id).subscribe(err => console.log(err));
    this.matDialog.open(VisitDeletedComponent);
  }

  deleteRequest(id: number) {
    this.patientManager.setAbandonRequest(id).subscribe(err => console.log(err));
  }

  changeOptions() {
    if (this.selectedModel == "history") {
      this.showHistory = true;
      this.showPending = false;
    } else if (this.selectedModel == "pending") {
      this.showPending = true;
      this.showHistory = false;
    } else if (this.selectedModel == "both") {
      this.showHistory = true;
      this.showPending = true;
    }
  }

}
