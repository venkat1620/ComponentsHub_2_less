import { SwipeButtonModule } from './swipe-button.module';

describe('SwipeButtonModule', () => {
  let swipeButtonModule: SwipeButtonModule;

  beforeEach(() => {
    swipeButtonModule = new SwipeButtonModule();
  });

  it('should create an instance', () => {
    expect(swipeButtonModule).toBeTruthy();
  });
});
