import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-legend',
  templateUrl: './custom-legend.component.html',
  styleUrls: ['./custom-legend.component.scss']
})
export class CustomLegendComponent implements OnInit, OnChanges {

  sum: number = 0;
  @Input() data: any = [];
  @Input() onTrueHoverEvent: Observable<void> = new Observable<void>;
  @Input() onFalseHoverEvent: Observable<void> = new Observable<void>;
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();
  private trueEventSubscription !: Subscription;
  private falsEeventSubscription !: Subscription;

  constructor() { }

  ngOnInit(): void {
  }

  //used to detect hover events in the parent component
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.calculateSum();
      this.unsubscribeRegisteredEvents();
      this.trueEventSubscription = this.onTrueHoverEvent.subscribe((hoveredElement) =>
        this.hoverLegendTrue(hoveredElement)
      )
      this.falsEeventSubscription = this.onFalseHoverEvent.subscribe((hoveredFalseElement) =>
        this.hoverLegendFalse(hoveredFalseElement)
      )
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeRegisteredEvents();
  }

  unsubscribeRegisteredEvents(): void {
    if (this.trueEventSubscription)
      this.trueEventSubscription.unsubscribe();

    if (this.falsEeventSubscription)
      this.falsEeventSubscription.unsubscribe();
  }

  //this function defines the UX changes on Hover.
  hoverLegendTrue(event: any): void {
    (document.querySelector('[aria-label="' + event.value.name + '-legend"]') as HTMLElement).className = 'active-portfolio-card'
  }

  hoverLegendFalse(FalseEvent: any): void {
    (document.querySelector('[aria-label="' + FalseEvent.value.name + '-legend"]') as HTMLElement).className = 'portfolio-card'
  }

  onClick(portfolio: any) {
    this.onClickEvent.emit(portfolio);
  }

  calculateSum() {
    for (const portfolio of this.data) {
      this.sum += portfolio.value
    }
  }

}
