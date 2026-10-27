import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AttendanceService } from '../../../../services/services/attendance';
import { StudentService } from '../../../../services/services/student';
import { MealService } from '../../../../services/services/meal';

import { Student } from '../../../../models/models/student.model';
import { Meal } from '../../../../models/models/meal.model';

@Component({
  selector: 'app-attendance-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './attendance-add.html',
  styleUrl: './attendance-add.css'
})
export class AttendanceAdd implements OnInit {

  attendanceForm: FormGroup;

  students: Student[] = [];
  meals: Meal[] = [];

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private studentService: StudentService,
    private mealService: MealService,
    private router: Router
  ) {

    this.attendanceForm = this.fb.group({

      student: [null, Validators.required],

      meal: [null, Validators.required],

      attendanceDate: [
        '',
        Validators.required
      ],

      isPresent: [
        true,
        Validators.required
      ]

    });

  }

  ngOnInit(): void {

    this.loadStudents();
    this.loadMeals();

  }

  loadStudents(): void {

    this.studentService.getAll().subscribe({

      next: (data: Student[]) => {

        this.students = data;

        console.log(
          'Students loaded:',
          data
        );

      },

      error: (error: any) => {

        console.error(
          'Error loading students:',
          error
        );

      }

    });

  }

  loadMeals(): void {

    this.mealService.getAll().subscribe({

      next: (data: Meal[]) => {

        this.meals = data;

        console.log(
          'Meals loaded:',
          data
        );

      },

      error: (error: any) => {

        console.error(
          'Error loading meals:',
          error
        );

      }

    });

  }

  markAttendance(): void {

    if (this.attendanceForm.invalid) {

      this.attendanceForm.markAllAsTouched();

      return;

    }

    const formValue =
      this.attendanceForm.value;

    const attendance = {

      student: {
        id: formValue.student
      },

      meal: {
        id: formValue.meal
      },

      attendanceDate:
        formValue.attendanceDate,

      isPresent:
        formValue.isPresent

    };

    console.log(
      'Attendance being sent:',
      attendance
    );

    this.attendanceService
      .create(attendance as any)
      .subscribe({

        next: () => {

          alert(
            'Attendance marked successfully!'
          );

          this.router.navigate([
            '/attendance'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Error marking attendance:',
            error
          );

          alert(
            'Failed to mark attendance.'
          );

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/attendance'
    ]);

  }

}