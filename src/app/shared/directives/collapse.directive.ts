import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: '[collapse]',
  template: '<ng-content></ng-content>',
  // animations: [
  //   trigger('collapse', [
  //     state('0', style({ height: '0', opacity: '0' })),
  //     state('1', style({ height: '*', opacity: '1' })),
  //     transition('0 <=> 1', animate('{{duration}}ms {{easing}}'), {
  //       params: {
  //         duration: 200,
  //         easing: "ease-in-out"
  //       }
  //     })
  //   ])
  // ]
  animations: [
    trigger('collapse', [
      state('true', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('false', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(300 + 'ms ease-in')),
      transition('true => false', animate(300 + 'ms ease-out'))
    ])
  ]
})
export class CollapseComponent {
  @HostBinding('@collapse')
  @Input()
  collapse!: boolean;


  @HostListener("@collapse.start", ["$event"])
  onCollapseStart(event: any) {
    // console.log("Starting", event);
  }

  @HostListener("@collapse.done", ["$event"])
  onCollapseDone(event: any) {
    // console.log("Starting", event);
  }
}
