import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertMeetingsComponent } from './expert-meetings.component';

describe('ExpertMeetingsComponent', () => {
  let component: ExpertMeetingsComponent;
  let fixture: ComponentFixture<ExpertMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
