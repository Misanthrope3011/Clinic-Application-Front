import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DoctorManagerService {

  constructor(private http: HttpClient) { }

  getDoctors() {
    return this.http.get('http://localhost:8080/getDoctorList');
  }

  getUserRates(id: number) {
    return this.http.get('http://localhost:8080/patient/getUserRates/' + id);
  }
  getRating() {
    return this.http.get('http://localhost:8080/patient/getDoctorRates');
  }

  abandonVisit(id: number): Observable<any> {
      return this.http.delete('http://localhost:8080/doctor/abandonVisit/' + id);
  }

  displayVisits(id: number, page: number, size: number): Observable<any> {
      return this.http.get(`http://localhost:8080/doctor/pendingVisits/${id}`,  {observe: 'response'});
  }

  getTodayVisits(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/doctor/getTodayVisits/${id}`,  {observe: 'response'});
  }

  findUserByPESEL(PESEL: string): Observable<any> {
    return this.http.post(`http://localhost:8080/doctor/findByPESEL`, PESEL);
  }

  updateRate(rateId: number, formGroup: FormGroup): Observable<any> {
    return this.http.put(`http://localhost:8080/patient/updateRate/` + rateId, formGroup.getRawValue());
  }

  getNumberOfPatients(): Observable<any> {
    return this.http.get(`http://localhost:8080/doctor/getNumberOfPatients`,  {observe: 'response'});
  }

  changeNumberOfElementsDisplayed(numberOfItems: string, currentPage = "0"): Observable<any> {
      return this.http.get(`http://localhost:8080/getAllPatients?`,{
        params: {
          page: currentPage,
          size: numberOfItems
        },
    })
  }

}
