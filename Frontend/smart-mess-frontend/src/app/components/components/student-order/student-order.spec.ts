import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentOrder } from './student-order';

describe('StudentOrder', () => {
  let component: StudentOrder;
  let fixture: ComponentFixture<StudentOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});