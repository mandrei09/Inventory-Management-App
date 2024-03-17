import { NgModule } from '@angular/core';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { FloorMap } from '../../forms/common/floors/floors';
import { FloorsRoutingModule } from './floors-routing.module';

@NgModule({
  imports: [
    FloorsRoutingModule,
    PdfViewerModule,
  ],
  declarations: [ FloorMap ],
  exports: [FloorMap, PdfViewerComponent]
})
export class FloorsModule { }
