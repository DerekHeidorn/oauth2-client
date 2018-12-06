import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUserDetailComponent } from './public-user-detail.component';

describe('PublicUserDetailComponent', () => {
  let component: PublicUserDetailComponent;
  let fixture: ComponentFixture<PublicUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
