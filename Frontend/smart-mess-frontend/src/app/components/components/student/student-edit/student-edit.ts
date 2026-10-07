import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../services/services/student';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.html',
  styleUrl: './student-edit.css'
})
export class StudentEdit implements OnInit {

  studentForm: FormGroup;
  studentId!: number;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
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

      password: [''],

      phone: [''],

      rollNumber: [''],

      department: [''],

      hostelName: [''],

      roomNumber: ['']

    });

  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('EDIT STUDENT ID:', id);

    if (!id) {

      alert('Student ID not found.');

      this.router.navigate(['/students']);

      return;
    }

    this.studentId = Number(id);

    this.loadStudent();

  }

  loadStudent(): void {

    this.loading = true;

    this.studentService
      .getById(this.studentId)
      .subscribe({

        next: (student: any) => {

          console.log(
            'STUDENT FOR EDIT:',
            student
          );

          this.studentForm.patchValue({

            name: student.name || '',

            email: student.email || '',

            password: '',

            phone: student.phone || '',

            rollNumber:
              student.rollNumber || '',

            department:
              student.department || '',

            hostelName:
              student.hostelName || '',

            roomNumber:
              student.roomNumber || ''

          });

          this.loading = false;

        },

        error: (error: any) => {

          console.error(
            'LOAD STUDENT ERROR:',
            error
          );

          this.loading = false;

          alert('Failed to load student.');

          this.router.navigate(['/students']);

        }

      });

  }

  updateStudent(): void {

    if (this.studentForm.invalid) {

      this.studentForm.markAllAsTouched();

      return;
    }

    const studentData = {
      ...this.studentForm.value
    };

    /*
      Password blank असेल तर existing password
      change करण्याचा प्रयत्न करू नये.
    */

    if (!studentData.password) {

      delete studentData.password;

    }

    console.log(
      'UPDATING STUDENT:',
      this.studentId,
      studentData
    );

    this.studentService
      .update(
        this.studentId,
        studentData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'STUDENT UPDATED:',
            response
          );

          alert(
            'Student updated successfully!'
          );

          this.router.navigate([
            '/students'
          ]);

        },

        error: (error: any) => {

          console.error(
            'UPDATE STUDENT ERROR:',
            error
          );

          alert(
            'Failed to update student.'
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