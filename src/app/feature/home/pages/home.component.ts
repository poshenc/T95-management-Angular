import { Component, OnInit } from '@angular/core';
import { priceCard } from 'src/app/feature/home/models/price-card.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stockData: priceCard[];

  constructor() {
    this.stockData = [
      {
        name: 'Dow Jones',
        price: '33753.60',
        movementPrice: '416.90',
        movementPercentage: '1.25'
      },
      {
        name: 'Nasdaq',
        price: '13560.20',
        movementPrice: '268.20',
        movementPercentage: '2.02'
      },
      {
        name: 'S&P 500',
        price: '4278.50',
        movementPrice: '71.20',
        movementPercentage: '1.69'
      },
      {
        name: 'TSLA',
        price: '900.29',
        movementPrice: '40.20',
        movementPercentage: '4.58'
      },
    ]
  }

  ngOnInit(): void {
  }


}
