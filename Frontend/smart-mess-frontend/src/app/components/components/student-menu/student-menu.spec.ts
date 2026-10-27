import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMenu } from './student-menu';

describe('StudentMenu', () => {
  let component: StudentMenu;
  let fixture: ComponentFixture<StudentMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});