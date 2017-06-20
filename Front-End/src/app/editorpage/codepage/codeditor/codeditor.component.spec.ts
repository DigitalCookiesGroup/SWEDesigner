import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeditorComponent } from './codeditor.component';

describe('CodeditorComponent', () => {
  let component: CodeditorComponent;
  let fixture: ComponentFixture<CodeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
