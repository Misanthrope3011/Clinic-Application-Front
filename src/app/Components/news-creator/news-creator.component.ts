import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-news-creator',
  templateUrl: './news-creator.component.html',
  styleUrls: ['./news-creator.component.css']
})
export class NewsCreatorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  newsCreator = new FormGroup({
    title: new FormControl(''),
    header: new FormControl(''),
    content: new FormControl('')
  });

  sendContactForm() {
    this.http.post("http://localhost:8080/admin/addNews", this.newsCreator.value).subscribe(data => 
    console.log(data));
  }

}
