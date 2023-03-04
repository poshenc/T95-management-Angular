import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** directives **/
import { CollapseComponent } from './directives/collapse.directive';

/** pipes **/
import { ObjectArrayFilterPipe } from './pipes/objectArrayFilter.pipe';
import { CustomLegendComponent } from './components/custom-legend/custom-legend.component';

/** components **/

@NgModule({
  providers: [],
  declarations: [
    ObjectArrayFilterPipe,
    CollapseComponent,
    CustomLegendComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ObjectArrayFilterPipe,
    CollapseComponent,
    CustomLegendComponent
  ]
})

export class SharedModule { }
