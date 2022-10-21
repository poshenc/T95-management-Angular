import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: '[collapse]',
  template: '<ng-content></ng-content>',
  animations: [
    trigger('collapse', [
      state('0', style({ height: '0', opacity: '0' })),
      state('1', style({ height: '*', opacity: '1' })),
      transition('0 <=> 1', animate('{{duration}}ms {{easing}}'), {
        params: {
          duration: 500,
          easing: "ease-in-out"
        }
      })
    ])
  ]
})
export class CollapseComponent {
  @HostBinding('@collapse')
  @Input()
  collapse!: boolean;


  @HostListener("@collapse.start", ["$event"])
  onCollapseStart(event: any) {
    console.log("Starting", event);
  }

  @HostListener("@collapse.done", ["$event"])
  onCollapseDone(event: any) {
    console.log("Starting", event);
  }
}
