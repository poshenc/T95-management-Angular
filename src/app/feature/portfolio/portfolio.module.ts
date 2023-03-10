import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { BtnCellRendererComponent } from './components/btn-cell-renderer/btn-cell-renderer.component';
import { HoldingsCardComponent } from './components/holdings-card/holdings-card.component';
import { EditPortfolioComponent } from './pages/edit-portfolio/edit-portfolio.component';
import { NewPortfolioComponent } from './pages/new-portfolio/new-portfolio.component';
import { NewPositionComponent } from './pages/new-position/new-position.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';

@NgModule({
  declarations: [
    PortfolioComponent,
    PortfoliosComponent,
    NewPortfolioComponent,
    EditPortfolioComponent,
    HoldingsCardComponent,
    NewPositionComponent,
    BtnCellRendererComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    AgGridModule,
    NgxChartsModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
    NgSelectModule
  ]
})
export class PortfolioModule { }
