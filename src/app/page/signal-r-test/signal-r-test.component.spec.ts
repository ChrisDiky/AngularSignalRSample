import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalRTestComponent } from './signal-r-test.component';

describe('SignalRTestComponent', () => {
  let component: SignalRTestComponent;
  let fixture: ComponentFixture<SignalRTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalRTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalRTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
