import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-holdings-card',
  templateUrl: './holdings-card.component.html',
  styleUrls: ['./holdings-card.component.scss']
})
export class HoldingsCardComponent implements OnInit {

  @Input() showMoney: boolean | undefined;
  @Output() showMoneyChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowMoney() {
    this.showMoney = !this.showMoney
    this.showMoneyChange.emit(this.showMoney);
  }

}
