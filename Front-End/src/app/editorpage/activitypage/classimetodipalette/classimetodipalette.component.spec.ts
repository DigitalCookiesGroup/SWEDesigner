import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassimetodipaletteComponent } from './classimetodipalette.component';

describe('ClassimetodipaletteComponent', () => {
  let component: ClassimetodipaletteComponent;
  let fixture: ComponentFixture<ClassimetodipaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassimetodipaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassimetodipaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
