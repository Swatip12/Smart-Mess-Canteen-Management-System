import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentComplaint } from './student-complaint';

describe('StudentComplaint', () => {
  let component: StudentComplaint;
  let fixture: ComponentFixture<StudentComplaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentComplaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentComplaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});