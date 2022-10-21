import { NgModule } from '@angular/core';

/** directives **/
import { CollapseComponent } from './directives/collapse.directive';

/** pipes **/
import { ObjectArrayFilterPipe } from './pipes/objectArrayFilter.pipe';

/** components **/

@NgModule({
  providers: [],
  declarations: [
    ObjectArrayFilterPipe,
    CollapseComponent,
  ],
  imports: [
  ],
  exports: [
    ObjectArrayFilterPipe,
    CollapseComponent,
  ]
})

export class SharedModule { }
