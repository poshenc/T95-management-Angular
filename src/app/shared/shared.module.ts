import { NgModule } from '@angular/core';

/** directives **/

/** pipes **/
import { ObjectArrayFilterPipe } from './pipes/objectArrayFilter.pipe';

/** components **/

@NgModule({
  providers: [],
  declarations: [
    ObjectArrayFilterPipe,
  ],
  imports: [
  ],
  exports: [
    ObjectArrayFilterPipe,
  ]
})

export class SharedModule { }