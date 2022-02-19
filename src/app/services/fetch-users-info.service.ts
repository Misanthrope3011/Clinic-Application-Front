import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {FormGroup, FormControl} from '@angular/forms';
import {User} from '../../Prototypes/User'
import {Patient} from '../../Prototypes/Patient'
import {TokenStorageService} from '../services/tokenstorage.service'

@Injectable({
  providedIn: 'root'
})
export class FetchUsersInfoService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getUsers(){
    return this.http.get("http://localhost:8080/home", {observe: 'response'});
  }

  sendForm(user: User) : Observable<any>{
    return this.http.post("http://localhost:8080/signUp", user, {observe: 'response'});
  };

  sendPatientInfo(patient: Patient) : Observable<any>{
    return this.http.post("http://localhost:8080/savePatient", patient, {observe: 'response'});
  }

  sendLoginRequest(loginForm: FormGroup) : Observable<any>{
    return this.http.post("http://localhost:8080/signIn", loginForm, {observe: 'response'});   
  };

  sendProfileRequest() : Observable<any>{
    
    return this.http.post("http://localhost:8080/", this.tokenService.getUser().body.id, {observe: 'response'});
  };

  
  currentLogged() : Observable<any>{
    
    this.tokenService.getUser().body;

    return this.http.post("http://localhost:8080/patient/getProfile" , this.tokenService.getUser().body.id, {observe: 'response'});
  };

  fetchAppropriateInfo(): Observable<any>{

   const userRole = this.tokenService.getUser().roles;

   return;
}
}

