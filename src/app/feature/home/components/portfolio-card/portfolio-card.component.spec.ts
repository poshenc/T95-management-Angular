
import { of } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { PortfolioCardComponent } from './portfolio-card.component';

describe('PortfolioCardComponent', () => {
  let component: PortfolioCardComponent;

  let homeServiceSpy: jasmine.SpyObj<HomeService>;

  beforeAll(() => {
    homeServiceSpy = jasmine.createSpyObj(['getPortfoliosByUser']);
    homeServiceSpy.getPortfoliosByUser.and.returnValue(of([]));

    component = new PortfolioCardComponent(homeServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
