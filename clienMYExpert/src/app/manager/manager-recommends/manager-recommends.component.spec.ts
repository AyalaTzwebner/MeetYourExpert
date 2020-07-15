import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRecommendsComponent } from './manager-recommends.component';

describe('ManagerRecommendsComponent', () => {
  let component: ManagerRecommendsComponent;
  let fixture: ComponentFixture<ManagerRecommendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerRecommendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRecommendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
