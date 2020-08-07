import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinginComponent } from './singin.component';

describe('SinginComponent', () => {
  let component: SinginComponent;
  let fixture: ComponentFixture<SinginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
