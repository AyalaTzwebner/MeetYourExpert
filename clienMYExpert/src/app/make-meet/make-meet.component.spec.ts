import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeMeetComponent } from './make-meet.component';

describe('MakeMeetComponent', () => {
  let component: MakeMeetComponent;
  let fixture: ComponentFixture<MakeMeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeMeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
