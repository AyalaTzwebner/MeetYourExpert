import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispExpertComponent } from './disp-expert.component';

describe('DispExpertComponent', () => {
  let component: DispExpertComponent;
  let fixture: ComponentFixture<DispExpertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispExpertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
