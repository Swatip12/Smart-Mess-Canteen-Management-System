import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodOrderList } from './food-order-list';

describe('FoodOrderList', () => {
  let component: FoodOrderList;
  let fixture: ComponentFixture<FoodOrderList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodOrderList],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodOrderList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
