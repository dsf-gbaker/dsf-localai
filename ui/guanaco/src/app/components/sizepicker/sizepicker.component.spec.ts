import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizepickerComponent } from './sizepicker.component';

describe('SizepickerComponent', () => {
  let component: SizepickerComponent;
  let fixture: ComponentFixture<SizepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizepickerComponent]
    });
    fixture = TestBed.createComponent(SizepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
