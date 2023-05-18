import {Component, OnInit} from '@angular/core';
import {FetchUsersInfoService} from 'src/app/services/fetch-users-info.service';
import {User} from '../../../Prototypes/User'
import {Patient} from '../../../Prototypes/Patient'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../services/tokenstorage.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  patient: Patient;
  user: User;
  submitted = false;
  error = false;
  seerviceStatus: any;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    homeNumber: new FormControl(''),
    postalCode: new FormControl(''),
    PESEL: new FormControl('')
  });

  constructor(private fetchService: FetchUsersInfoService, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router) {
    this.user = new User();
    this.patient = new Patient();
  }

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-ZęółśążźćńĘÓŁŚĄŻŹĆŃ ]*')]],
      street: ['', Validators.required],
      homeNumber: ['', [Validators.required, Validators.maxLength(4)]],
      postalCode: ['', [Validators.required, Validators.pattern('[0-9]{2}\-[0-9]{3}')]],
      PESEL: ['', [Validators.required, Validators.pattern('[0-9]{11}')]]
    });

  }

  sendApi() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      this.error = true;
    } else {
      this.submitted = false;
      this.user.signUpDate = new Date();
      this.patient.name = this.profileForm.controls['firstName'].value;
      this.patient.lastName = this.profileForm.controls['lastName'].value;
      this.user.email = this.profileForm.controls['email'].value;
      this.user.password = this.profileForm.controls['password'].value;
      this.patient.city = this.profileForm.controls['city'].value;
      this.patient.street = this.profileForm.controls['street'].value;
      this.patient.homeNumber = this.profileForm.controls['homeNumber'].value;
      this.patient.postalCode = this.profileForm.controls['postalCode'].value;
      this.patient.PESEL = this.profileForm.controls['PESEL'].value;

      this.fetchService.sendForm(this.user).subscribe(data => {
          this.seerviceStatus = data;
          this.patient.userId = data.body.id;

          this.fetchService.sendPatientInfo(this.patient).subscribe(data => {
            console.log(data);
            //this.router.navigate(['login']);
          })
        }, err => console.log(err)
      )

      this.profileForm.reset();
      this.profileForm.setErrors({'invalid': true});
      this.submitted = false;
      this.error = false;
    }

  }

}
