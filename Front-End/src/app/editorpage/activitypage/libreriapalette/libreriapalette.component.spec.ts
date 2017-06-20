import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibreriapaletteComponent } from './libreriapalette.component';

describe('LibreriapaletteComponent', () => {
  let component: LibreriapaletteComponent;
  let fixture: ComponentFixture<LibreriapaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibreriapaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreriapaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
