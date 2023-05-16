import {Component, Input} from '@angular/core';
import {FetchUsersInfoService} from './services/fetch-users-info.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from './services/tokenstorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClinicProjectFrontend';
  info: any;
  logosrc = '/assets/img/logo.png';
  logoaltsrc = 'logotyp';
  login = false;
  @Input()
  avatar: any;

  constructor(private fetchService: FetchUsersInfoService, private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService) {

  }

  ngOnInit(): void {

    this.info = this.fetchService.getUsers();
    const user = JSON.parse(window.localStorage.getItem('auth-user'));
    if (this.tokenStorage.isLoggedIn()) {
      this.login = true;
    } else {
      this.login = false;
    }

  }


  logout() {
    return this.tokenStorage.signOut();
  }


}
