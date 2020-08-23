import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraUsersComponent } from './bitacora-users.component';

describe('BitacoraUsersComponent', () => {
  let component: BitacoraUsersComponent;
  let fixture: ComponentFixture<BitacoraUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
