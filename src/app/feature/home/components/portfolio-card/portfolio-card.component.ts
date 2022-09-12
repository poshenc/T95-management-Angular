import { Component, Input, OnInit } from '@angular/core';
import { portfolioCard } from '../../models/price-card.models';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit {

  @Input() portfolioData: portfolioCard[] | undefined;
  @Input() showMoney: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.portfolioData);
  }

}
