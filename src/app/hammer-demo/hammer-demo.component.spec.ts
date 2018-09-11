import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HammerDemoComponent } from './hammer-demo.component';

describe('HammerDemoComponent', () => {
  let component: HammerDemoComponent;
  let fixture: ComponentFixture<HammerDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HammerDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HammerDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
