import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  news;

  ngOnInit(): void {
    this.httpClient.get("http://localhost:8080/news?page=1&limit=5").subscribe(data => this.news = data);
  }


}
