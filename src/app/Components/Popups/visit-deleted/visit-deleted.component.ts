import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-visit-deleted',
  templateUrl: './visit-deleted.component.html',
  styleUrls: ['./visit-deleted.component.css']
})
export class VisitDeletedComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  refresh() {
    window.location.reload();
  }

}
