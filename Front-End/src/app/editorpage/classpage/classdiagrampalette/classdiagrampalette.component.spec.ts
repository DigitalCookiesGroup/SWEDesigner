import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassdiagrampaletteComponent } from './classdiagrampalette.component';

describe('ClassdiagrampaletteComponent', () => {
  let component: ClassdiagrampaletteComponent;
  let fixture: ComponentFixture<ClassdiagrampaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassdiagrampaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassdiagrampaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
