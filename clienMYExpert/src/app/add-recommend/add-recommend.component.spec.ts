import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecommendComponent } from './add-recommend.component';

describe('AddRecommendComponent', () => {
  let component: AddRecommendComponent;
  let fixture: ComponentFixture<AddRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
