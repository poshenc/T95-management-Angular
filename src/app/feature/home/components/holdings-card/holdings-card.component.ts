import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-holdings-card',
  templateUrl: './holdings-card.component.html',
  styleUrls: ['./holdings-card.component.scss']
})
export class HoldingsCardComponent implements OnInit {

  //from parent
  @Input() currentTotal!: number;
  @Input() showMoney?: boolean;
  @Output() showMoneyChange = new EventEmitter<boolean>();

  //local props
  historical: any = {
    yesterdayChange: 0,
    yesterdatMovement: 0,
    lastYearChange: 0,
    lastYearMovement: 0
  };
  currentTime: Date = new Date();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.getAllPortfoliosValueByDate("2023-01-18", "yesterday");
    this.getAllPortfoliosValueByDate("2023-01-17", "lastYear");
  }

  toggleShowMoney() {
    this.showMoney = !this.showMoney
    this.showMoneyChange.emit(this.showMoney);
  }

  async getAllPortfoliosValueByDate(date: string, prop: string) {
    const allValue = await lastValueFrom(this.homeService.getAllPortfoliosValueByDate(date));

    let totalValue = 0;
    allValue.forEach(portfolio => totalValue += portfolio.value);
    this.historical[prop + 'Change'] = this.currentTotal - totalValue;
    this.historical[prop + 'Movement'] = (this.currentTotal - totalValue) / totalValue;
  }

}
