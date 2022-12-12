import { of } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';

import { PortfoliosComponent } from './portfolios.component';

describe('PortfoliosComponent', () => {
  let component: PortfoliosComponent;

  let portfolioServiceSpy: jasmine.SpyObj<PortfolioService>;

  beforeAll(() => {
    portfolioServiceSpy = jasmine.createSpyObj(['getPortfolios', 'calculateAllocations', 'getPortfolioPositions']);
    portfolioServiceSpy.getPortfolios.and.returnValue(of([]));

    component = new PortfoliosComponent(portfolioServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
