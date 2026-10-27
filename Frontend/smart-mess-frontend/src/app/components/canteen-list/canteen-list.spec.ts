import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanteenList } from './canteen-list';

describe('CanteenList', () => {
  let component: CanteenList;
  let fixture: ComponentFixture<CanteenList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanteenList],
    }).compileComponents();

    fixture = TestBed.createComponent(CanteenList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
