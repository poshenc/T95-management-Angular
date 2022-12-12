
import { HoldingsCardComponent } from './holdings-card.component';

describe('HoldingsCardComponent', () => {
  let component: HoldingsCardComponent;

  beforeAll(() => {
    component = new HoldingsCardComponent();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
