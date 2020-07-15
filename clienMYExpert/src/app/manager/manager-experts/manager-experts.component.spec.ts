import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerExpertsComponent } from './manager-experts.component';

describe('ManagerExpertsComponent', () => {
  let component: ManagerExpertsComponent;
  let fixture: ComponentFixture<ManagerExpertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerExpertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
