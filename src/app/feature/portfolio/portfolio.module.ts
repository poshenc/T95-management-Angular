import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';



@NgModule({
  declarations: [
    PortfolioComponent,
    PortfoliosComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    AgGridModule
  ]
})
export class PortfolioModule { }
