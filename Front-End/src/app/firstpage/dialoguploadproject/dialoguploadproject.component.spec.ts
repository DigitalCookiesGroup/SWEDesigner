import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoguploadprojectComponent } from './dialoguploadproject.component';

describe('DialoguploadprojectComponent', () => {
  let component: DialoguploadprojectComponent;
  let fixture: ComponentFixture<DialoguploadprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoguploadprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoguploadprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
