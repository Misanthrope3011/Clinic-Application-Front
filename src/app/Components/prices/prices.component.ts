import {Component, OnInit} from '@angular/core';
import {PricesService} from 'src/app/services/prices-service.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {

  result: [];

  constructor(private pricesService: PricesService) {
  }

  ngOnInit(): any {
    return this.pricesService.getPricing().subscribe(e => {
      this.result = e;
      console.log(e);
    });
  }

}
