import {Component, OnInit} from '@angular/core';
import {FetchUsersInfoService} from '../../services/fetch-users-info.service'
import {TokenStorageService} from '../../services/tokenstorage.service'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {


  content;

  constructor(private fetchService: FetchUsersInfoService, private tokenStorage: TokenStorageService) {
  }


  ngOnInit(): void {
    console.log(this.tokenStorage.getUser().body.id);
    this.fetchService.currentLogged().subscribe(resp => console.log(resp));
  }

}
