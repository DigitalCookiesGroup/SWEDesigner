import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitydiagrampaletteComponent } from './activitydiagrampalette.component';

describe('ActivitydiagrampaletteComponent', () => {
  let component: ActivitydiagrampaletteComponent;
  let fixture: ComponentFixture<ActivitydiagrampaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitydiagrampaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitydiagrampaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
