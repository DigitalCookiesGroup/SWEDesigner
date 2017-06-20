import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasspageComponent } from './classpage.component';

describe('ClasspageComponent', () => {
  let component: ClasspageComponent;
  let fixture: ComponentFixture<ClasspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
