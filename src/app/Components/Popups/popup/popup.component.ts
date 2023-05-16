import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/tokenstorage.service'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  componentResponse: string;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {

    if (this.tokenStorage.isLoginSucces) {
      this.componentResponse = "Zalogowano pomyślnie";
    } else {
      this.componentResponse = "Błędne logowanie";
    }
  }

  refresh() {
    window.location.reload();
  }

}
