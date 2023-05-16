import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private httpClient: HttpClient) {
  }


  getPricing(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/prices");
  }

}
