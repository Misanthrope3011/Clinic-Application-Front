import {Component, OnInit} from '@angular/core';
import {FetchUsersInfoService} from 'src/app/services/fetch-users-info.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private sendProfileRequest: FetchUsersInfoService) {
  }

  ngOnInit(): void {
  }

}
