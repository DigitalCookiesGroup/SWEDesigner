import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodegeneratepaletteComponent } from './codegeneratepalette.component';

describe('CodegeneratepaletteComponent', () => {
  let component: CodegeneratepaletteComponent;
  let fixture: ComponentFixture<CodegeneratepaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodegeneratepaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodegeneratepaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
