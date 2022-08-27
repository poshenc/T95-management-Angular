import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
      { path: 'watchlist', loadChildren: () => import('./feature/watchlist/watchlist.module').then(m => m.WatchlistModule) },
      { path: 'portfolio', loadChildren: () => import('./feature/portfolio/portfolio.module').then(m => m.PortfolioModule) },
      { path: 'analysis', loadChildren: () => import('./feature/analysis/analysis.module').then(m => m.AnalysisModule) },
      { path: 'settings', loadChildren: () => import('./feature/settings/settings.module').then(m => m.SettingsModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
