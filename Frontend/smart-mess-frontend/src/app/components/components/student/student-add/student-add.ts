import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../../../../services/services/student';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css'
})
export class StudentAdd {

  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {

    this.studentForm = this.fb.group({

      name: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        Validators.required
      ],

      phone: [''],

      rollNumber: [''],

      department: [''],

      hostelName: [''],

      roomNumber: ['']

    });

  }

  submitForm(): void {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const studentData = {

      ...this.studentForm.value,

      status: 'ACTIVE'

    };

    console.log(
      'ADDING STUDENT:',
      studentData
    );

    this.studentService.create(studentData).subscribe({

      next: (response) => {

        console.log(
          'STUDENT ADDED:',
          response
        );

        alert(
          'Student added successfully!'
        );

        this.router.navigate([
          '/students'
        ]);

      },

      error: (error: any) => {

        console.error(
          'ADD STUDENT ERROR:',
          error
        );

        console.error(
          'STATUS:',
          error.status
        );

        console.error(
          'ERROR BODY:',
          error.error
        );

        alert(
          'Student could not be added.'
        );

      }

    });

  }

  cancel(): void {

    this.router.navigate([
      '/students'
    ]);

  }

}