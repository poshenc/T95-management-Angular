import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { NewPortfolioComponent } from './pages/new-portfolio/new-portfolio.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { EditPortfolioComponent } from './pages/edit-portfolio/edit-portfolio.component';



@NgModule({
  declarations: [
    PortfolioComponent,
    PortfoliosComponent,
    NewPortfolioComponent,
    EditPortfolioComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    AgGridModule,
    NgxChartsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class PortfolioModule { }
