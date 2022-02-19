import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {TokenStorageService} from '../../services/tokenstorage.service'
import { DropdownComponent } from '../dropdown/dropdown.component';
import {FetchUsersInfoService} from '../../services/fetch-users-info.service';
import {Router} from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private fetchUser: FetchUsersInfoService, private router: Router) {

   }

  image: any;
  reader: FileReader;
  doctors: any;
  dropdown: DropdownComponent;
  formData;


  ngOnInit(): void {
  this.http.get('http://localhost:8080/retrieveImage/' + this.tokenStorage.getUser()["body"].id).subscribe(
    res => {        
      localStorage.setItem('avatar', JSON.stringify(res["image"]));
    })

  }
  chooseImage(event) {
    this.image = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', this.image);
  }

  onSubmit() { 
 
    this.http.post("http://localhost:8080/fileUpload/" + this.tokenStorage.getUser().body.id, this.formData.get('image'), { 
      responseType: 'blob' })
    .subscribe(res => {
    }); 
  }
}