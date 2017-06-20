import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitypageComponent } from './activitypage.component';

describe('ActivitypageComponent', () => {
  let component: ActivitypageComponent;
  let fixture: ComponentFixture<ActivitypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
