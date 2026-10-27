import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentNotices } from './student-notices';

describe('StudentNotices', () => {
  let component: StudentNotices;
  let fixture: ComponentFixture<StudentNotices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentNotices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNotices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});