import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistafilepaletteComponent } from './codelistafilepalette.component';

describe('CodelistafilepaletteComponent', () => {
  let component: CodelistafilepaletteComponent;
  let fixture: ComponentFixture<CodelistafilepaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodelistafilepaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelistafilepaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
