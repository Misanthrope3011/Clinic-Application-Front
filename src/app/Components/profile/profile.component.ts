import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/tokenstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileInfo: any;
  roleSpecificInfo;
  isPatient = false;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.profileInfo = this.tokenStorage.getUser().body;
    if (this.tokenStorage.getUser().body.roles[0] == "ROLE_DOCTOR") {
      this.roleSpecificInfo = this.tokenStorage.getUser().body.doctor;
      this.isPatient = true;
    } else if (this.tokenStorage.getUser().body.roles[0] == "ROLE_PATIENT") {
      this.roleSpecificInfo = this.tokenStorage.getUser().body.patient;
      this.isPatient = false;
    }
    console.log(this.roleSpecificInfo);
  }
}
