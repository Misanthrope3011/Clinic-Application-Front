import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientManagerService} from 'src/app/services/patient-manager.service';
import {TokenStorageService} from 'src/app/services/tokenstorage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  currentUser: any;
  isDoctorEdition;
  hasPatientRole = false;
  hasDoctorRole = false;
  hasAdminRole = false;
  roles: string[];
  roleSpecificInfo;
  userData;
  profileInfo;
  editProfile;
  editProfileDoctor
  submitted = false;
  error = false;
  succes = false;
  loaded: boolean = false;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private patientManager: PatientManagerService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  get f() {
    return this.editProfile.controls;
  }

  get k() {
    return this.editProfileDoctor.controls;
  }

  ngOnInit(): void {

    this.currentUser = this.tokenStorage.getUser().body;
    this.checkRole();
    if (this.tokenStorage.getUser().body.roles[0] == "ROLE_DOCTOR") {
      this.roleSpecificInfo = this.tokenStorage.getUser().body.doctor;
    } else if (this.tokenStorage.getUser().body.roles[0] == "ROLE_PATIENT") {
      this.roleSpecificInfo = this.tokenStorage.getUser().body.patient;
    } else if (this.tokenStorage.getUser().body.roles[0] == "ROLE_ADMIN") {
      this.roleSpecificInfo = {
        name: "Admin"
      }
    }

    if (this.activatedRoute.snapshot.url[0].path === "doctor" && this.activatedRoute.snapshot.url[1].path == "board") {
      var currentId = parseInt(this.activatedRoute.snapshot.url[3].path);
      this.isDoctorEdition = true;
    } else if (this.tokenStorage.getUser().body.roles[0] == "ROLE_PATIENT") {
      this.userData = this.tokenStorage.getUser().body.patient;
      currentId = this.userData.id;
    } else if (this.tokenStorage.getUser().body.roles[0] == "ROLE_DOCTOR") {
      this.userData = this.tokenStorage.getUser().body.doctor;
      currentId = this.userData.id;
    }
    if (this.hasPatientRole == true || this.isDoctorEdition) {
      this.patientManager.getPatient(currentId).subscribe(err => {
        this.userData = err["body"]
        console.log(this.userData);
        this.editProfile = new FormGroup({
          id: new FormControl(this.userData.id),
          firstName: new FormControl(this.userData.name),
          lastName: new FormControl(this.userData.last_name),
          city: new FormControl(this.userData.city),
          street: new FormControl(this.userData.street),
          homeNumber: new FormControl(this.userData.home_number),
          postalCode: new FormControl(this.userData.postal_code),
          PESEL: new FormControl(this.userData.pesel)
        });
        this.editProfile = this.formBuilder.group({
          id: new FormControl(this.userData.id),
          firstName: [this.userData.name, [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
          lastName: [this.userData.last_name, [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
          city: [this.userData.city, [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ ]*')]],
          street: [this.userData.street, Validators.required],
          homeNumber: [this.userData.home_number, [Validators.required, Validators.maxLength(4)]],
          postalCode: [this.userData.postal_code, [Validators.required, Validators.pattern('[0-9]{2}\-[0-9]{3}')]],
          PESEL: [this.userData.pesel, [Validators.required, Validators.pattern('[0-9]{11}')]]
        });
      });

    } else if (!this.isDoctorEdition) {
      this.editProfileDoctor = new FormGroup({
        id: new FormControl(this.userData.id),
        firstName: new FormControl(this.userData.name),
        lastName: new FormControl(this.userData.last_name),
        doctor_specialization: new FormControl(this.userData.doctor_specialization?.specialization_name)
      });
      this.editProfileDoctor = this.formBuilder.group({
        id: new FormControl(this.userData.id),
        firstName: [this.userData.name, [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
        lastName: [this.userData.last_name, [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
        doctor_specialization: [this.userData.doctor_specialization?.specialization_name, [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ ]*')]]
      });
    }

  }

  checkRole() {

    if (this.tokenStorage.getRoleInfo() == "ADMIN") {
      this.hasAdminRole = true;
    } else if (this.tokenStorage.getRoleInfo() == "PATIENT") {
      this.hasPatientRole = true;
    } else if (this.tokenStorage.getRoleInfo() == "DOCTOR") {
      this.hasDoctorRole = true;
    }


  }

  edit() {
    if (this.isDoctorEdition) {
      this.http.put("http://localhost:8080/doctor/editPatientProfile", this.editProfile.getRawValue()).subscribe(err => {
        this.succes = true;
      });
    } else if (this.hasPatientRole) {
      this.submitted = true;
      if (this.editProfile.invalid) {
        this.error = true;
        this.succes = false;
      } else {
        this.editProfile.controls['id'].value = this.currentUser.id;
        this.http.put("http://localhost:8080/patient/editProfile", this.editProfile.getRawValue()).subscribe(err => {

          var edited = JSON.parse(localStorage.getItem('auth-user'));
          console.log(edited);
          edited.body.patient.name = this.editProfile.controls['firstName'].value;
          edited.body.patient.last_name = this.editProfile.controls['lastName'].value;
          edited.body.patient.pesel = this.editProfile.controls['PESEL'].value;
          edited.body.patient.postal_code = this.editProfile.controls['postalCode'].value;
          edited.body.patient.home_number = this.editProfile.controls['homeNumber'].value;
          edited.body.patient.street = this.editProfile.controls['street'].value;
          edited.body.patient.city = this.editProfile.controls['city'].value;
          localStorage.setItem('auth-user', JSON.stringify(edited));
          window.location.reload;
        });
        this.submitted = false;
        this.error = false;
        this.succes = true;
      }
    } else if (this.hasDoctorRole) {
      this.submitted = true;
      if (this.editProfileDoctor.invalid) {
        this.error = true;
        this.succes = false;
      } else {
        this.editProfileDoctor.controls['id'].value = this.currentUser.id;
        this.http.put("http://localhost:8080/doctor/editProfile", this.editProfileDoctor.getRawValue()).subscribe(err => {
          var edited = JSON.parse(localStorage.getItem('auth-user'));
          edited.body.doctor.name = this.editProfileDoctor.controls['firstName'].value;
          edited.body.doctor.last_name = this.editProfileDoctor.controls['lastName'].value;
          localStorage.setItem('auth-user', JSON.stringify(edited));
          window.location.reload;
        })
        this.submitted = false;
        this.error = false;
        this.succes = true;
      }
    }
  }

  ngOnDestroy() {
    window.localStorage.removeItem('fetchedPatient');
  }

}

