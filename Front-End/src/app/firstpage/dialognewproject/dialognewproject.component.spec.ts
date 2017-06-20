import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialognewprojectComponent } from './dialognewproject.component';

describe('DialognewprojectComponent', () => {
  let component: DialognewprojectComponent;
  let fixture: ComponentFixture<DialognewprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialognewprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialognewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
