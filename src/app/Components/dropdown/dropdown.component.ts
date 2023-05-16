import {Component, Input, OnInit} from '@angular/core';
import {FetchUsersInfoService} from 'src/app/services/fetch-users-info.service';
import {TokenStorageService} from 'src/app/services/tokenstorage.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  currentUser: any;
  hasPatientRole = false;
  hasDoctorRole = false;
  hasAdminRole = false;
  roles: string[];
  setDefault: boolean = false;
  roleSpecificInfo;
  @Input() item = '';

  constructor(private fetchService: FetchUsersInfoService, private tokenStorage: TokenStorageService, private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser().body;

    window.localStorage.setItem('avatar', JSON.stringify(this.currentUser.image));

    if (window.localStorage.getItem('avatar') === null) {
      this.setDefault = true;
    } else {
      this.currentUser.image = JSON.parse(window.localStorage.getItem('avatar'));
    }

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

  logout() {
    return this.tokenStorage.signOut();
  }
}
