import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessList } from './mess-list';

describe('MessList', () => {
  let component: MessList;
  let fixture: ComponentFixture<MessList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessList],
    }).compileComponents();

    fixture = TestBed.createComponent(MessList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
