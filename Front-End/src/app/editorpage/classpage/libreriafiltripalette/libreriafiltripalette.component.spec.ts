import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibreriafiltripaletteComponent } from './libreriafiltripalette.component';

describe('LibreriafiltripaletteComponent', () => {
  let component: LibreriafiltripaletteComponent;
  let fixture: ComponentFixture<LibreriafiltripaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibreriafiltripaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreriafiltripaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
