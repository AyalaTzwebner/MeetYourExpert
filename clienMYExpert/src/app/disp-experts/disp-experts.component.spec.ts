import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispExpertsComponent } from './disp-experts.component';

describe('DispExpertsComponent', () => {
  let component: DispExpertsComponent;
  let fixture: ComponentFixture<DispExpertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispExpertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispExpertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
