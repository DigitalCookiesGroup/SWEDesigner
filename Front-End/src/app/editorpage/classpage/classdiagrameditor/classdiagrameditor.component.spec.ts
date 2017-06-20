import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassdiagrameditorComponent } from './classdiagrameditor.component';

describe('ClassdiagrameditorComponent', () => {
  let component: ClassdiagrameditorComponent;
  let fixture: ComponentFixture<ClassdiagrameditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassdiagrameditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassdiagrameditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
