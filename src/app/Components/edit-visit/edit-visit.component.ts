import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientManagerService} from '../../services/patient-manager.service';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.css']
})
export class EditVisitComponent implements OnInit {

  visitInfo: any;
  isVisitPaid: boolean = false;
  patients: any;
  succes = false;
  hasTookPlace;
  editVisit = new FormGroup({
    description: new FormControl(),
    isPaid: new FormControl(''),
    hasTookPlace: new FormControl('')

  })

  constructor(private formBuilder: FormBuilder, private patientManager: PatientManagerService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.patientManager.getVisit(parseInt(this.activatedRoute.snapshot.url[3].path)).subscribe((visit => {
      this.visitInfo = visit["body"]

      if (new Date() < this.visitInfo.startDate) {
      } else {

      }

      if (this.visitInfo.hasTookPlace === null) {
        this.hasTookPlace = false;
      } else {
        this.hasTookPlace = this.visitInfo.hasTookPlace;
      }

      this.isVisitPaid = this.visitInfo.paid;
      this.editVisit = this.formBuilder.group({
        description: [this.visitInfo.description],
        isPaid: [this.isVisitPaid],
        hasTookPlace: [this.hasTookPlace]
      })
    }));

  }


  editRequest() {
    console.log(this.editVisit.getRawValue());
    this.patientManager.updateVisit(this.visitInfo.id, this.editVisit.getRawValue()).subscribe(err => console.log(err));
    this.succes = true;
  }
}
