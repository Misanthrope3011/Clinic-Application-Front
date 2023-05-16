import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from 'src/app/services/tokenstorage.service';
import {PatientManagerService} from '../../services/patient-manager.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  finances: any;
  amountToPay: any;
  visits: any;
  pending: any;

  constructor(private patientManager: PatientManagerService, private http: HttpClient, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('auth-user'));

    this.patientManager.getDebts(user.body.patient.id).subscribe(err => {
      console.log(err);
      this.pending = err["body"]["NieZaplacone"]
      this.visits = err["body"]["Zaplacone"]
    });

    this.http.get("http://localhost:8080/patient/calculateBalance/" + this.token.getUser().body.patient.id)
      .subscribe(err => {
        console.log(err);
        this.finances = err;
        this.amountToPay = this.finances["Calosc"] - this.finances["Oplacone"];
      });

  }
}
