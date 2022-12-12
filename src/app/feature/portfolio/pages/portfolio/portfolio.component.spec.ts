import { of } from 'rxjs';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;

  let portfolioServiceSpy: jasmine.SpyObj<PortfolioService>;
  let activatedrouteSpy: jasmine.SpyObj<any>;

  beforeAll(() => {
    activatedrouteSpy = {
      params: of({
        portfolioId: 1,
      })
    }

    portfolioServiceSpy = jasmine.createSpyObj(['getPortfolioInfo', 'calculateAllocations', 'getPortfolioPositions']);
    portfolioServiceSpy.getPortfolioInfo.and.returnValue(of([]));
    portfolioServiceSpy.getPortfolioPositions.and.returnValue(of([]));

    component = new PortfolioComponent(portfolioServiceSpy, activatedrouteSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
