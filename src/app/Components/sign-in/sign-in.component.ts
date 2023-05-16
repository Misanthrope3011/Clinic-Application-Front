import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FetchUsersInfoService} from '../../services/fetch-users-info.service';
import {TokenStorageService} from '../../services/tokenstorage.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {PopupComponent} from '../Popups/popup/popup.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginRequest = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private fetchService: FetchUsersInfoService, private tokenStorage: TokenStorageService, private matDialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser();
      console.log(this.roles);
    }
  }

  login() {

    this.submitted = true;


    this.fetchService.sendLoginRequest(this.loginRequest.getRawValue()).subscribe(data => {
        this.tokenStorage.isLoginSucces = true;
        console.log(data.body);
        this.tokenStorage.saveToken(data.body.token);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().body.roles;
        this.errorMessage = data.status;
        this.router.navigate(['/home']);
        this.matDialog.open(PopupComponent);
      },
      err => {
        this.tokenStorage.isLoginSucces = false;
        this.errorMessage = err.status;
        this.isLoginFailed = true;
        this.matDialog.open(PopupComponent);

      }
    );

    this.loginRequest.get('username').clearValidators();
    this.loginRequest.get('username').updateValueAndValidity();
    this.loginRequest.get('password').clearValidators();
    this.loginRequest.get('password').updateValueAndValidity();
  }

}




