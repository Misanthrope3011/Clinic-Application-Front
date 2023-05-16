import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PatientManagerService {

  constructor(private httpClient: HttpClient) {
  }

  updateVisit(id: number, formGroup: FormGroup) {
    return this.httpClient.put(`http://localhost:8080/doctor/editVisit/${id}`, formGroup, {observe: 'response'});
  }

  getPatient(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/doctor/getPatient/${id}`, {observe: 'response'});
  }

  getVisit(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/doctor/getVisit/${id}`, {observe: 'response'});
  }

  getVisits(id: number): Observable<Object> {
    return this.httpClient.get(`http://localhost:8080/patient/pendingVisits/${id}`, {observe: 'response'});
  }

  getDebts(id: number): Observable<Object> {
    return this.httpClient.get(`http://localhost:8080/patient/sortByDebts/${id}`, {observe: 'response'});
  }


  updatePatient(formGroup: FormGroup): Observable<Object> {
    return this.httpClient.put(`http://localhost:8080/patient/editPatient`, formGroup, {observe: 'response'});
  }

  updateDoctor(formGroup: FormGroup): Observable<Object> {
    return this.httpClient.put(`http://localhost:8080/doctor/editPatient`, formGroup, {observe: 'response'});
  }


  deletePatient(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/doctor/deletePatient/${id}`, {observe: 'response'});
  }

  getAllPatients(): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/getAllPatients`, {observe: 'response'});
  }

  setAbandonRequest(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/patient/deleteRequest/` + id, {observe: 'response'});
  }

  getAbandonRequest(): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/doctor/getAbandoned`, {observe: 'response'});
  }


}
