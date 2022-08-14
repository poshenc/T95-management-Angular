import { Component, Input, OnInit } from '@angular/core';
import { priceCard } from 'src/app/feature/home/models/price-card.models';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss']
})
export class PriceCardComponent implements OnInit {

  @Input() stockData: priceCard[] | undefined;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.stockData)
  }

}
