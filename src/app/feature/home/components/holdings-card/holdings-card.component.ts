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
    totalChange: 0,
    totalMovement: 0
  };
  currentTime: Date = new Date();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  async ngOnChanges(): Promise<void> {
    const yesterdayStr = (d => new Date(d.setDate(d.getDate() - 1)))(new Date).toISOString().slice(0, 10);
    this.getAllPortfoliosValueByDate(yesterdayStr, "yesterday");
    const minDate = this.homeService.getMinDateOfAllPortfolios()
    this.getAllPortfoliosValueByDate(await minDate, "total");
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
