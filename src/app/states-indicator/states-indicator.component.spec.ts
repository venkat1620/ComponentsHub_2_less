import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesIndicatorComponent } from './states-indicator.component';

describe('StatesIndicatorComponent', () => {
  let component: StatesIndicatorComponent;
  let fixture: ComponentFixture<StatesIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
