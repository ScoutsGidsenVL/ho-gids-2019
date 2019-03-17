import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyInfoComponent } from './emergency-info.component';

describe('EmergencyInfoComponent', () => {
  let component: EmergencyInfoComponent;
  let fixture: ComponentFixture<EmergencyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
