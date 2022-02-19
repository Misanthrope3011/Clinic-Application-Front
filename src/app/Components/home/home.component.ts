import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/tokenstorage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  login: boolean = false;
  

  ngOnInit(): void {
    if(this.tokenStorage.isLoggedIn()) {
     this.login = true;
   } else {
     this.login = false;
   }
   
  }

}
