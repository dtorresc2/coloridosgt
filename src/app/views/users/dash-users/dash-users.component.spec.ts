import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUsersComponent } from './dash-users.component';

describe('DashUsersComponent', () => {
  let component: DashUsersComponent;
  let fixture: ComponentFixture<DashUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
