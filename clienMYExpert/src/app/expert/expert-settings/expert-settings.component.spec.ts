import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertSettingsComponent } from './expert-settings.component';

describe('ExpertSettingsComponent', () => {
  let component: ExpertSettingsComponent;
  let fixture: ComponentFixture<ExpertSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
