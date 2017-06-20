import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitydiagrameditorComponent } from './activitydiagrameditor.component';

describe('ActivitydiagrameditorComponent', () => {
  let component: ActivitydiagrameditorComponent;
  let fixture: ComponentFixture<ActivitydiagrameditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitydiagrameditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitydiagrameditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
