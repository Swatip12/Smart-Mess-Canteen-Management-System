import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { ComplaintService } from '../../../../services/services/complaint';
import { StudentService } from '../../../../services/services/student';

import { Student } from '../../../../models/models/student.model';

@Component({
  selector: 'app-complaint-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './complaint-add.html',
  styleUrl: './complaint-add.css'
})
export class ComplaintAdd implements OnInit {

  complaintForm: FormGroup;

  students: Student[] = [];

  categories: string[] = [
    'FOOD',
    'SERVICE',
    'HYGIENE',
    'BILLING',
    'OTHER'
  ];

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private studentService: StudentService,
    private router: Router
  ) {

    this.complaintForm = this.fb.group({

      student: [null, Validators.required],

      title: [
        '',
        Validators.required
      ],

      description: [''],

      category: [
        null,
        Validators.required
      ],

      status: ['OPEN']

    });

  }

  ngOnInit(): void {
    this.loadStudents();
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

  addComplaint(): void {

    if (this.complaintForm.invalid) {

      this.complaintForm.markAllAsTouched();

      return;

    }

    const formValue =
      this.complaintForm.value;

    const complaint = {

      student: {
        id: formValue.student
      },

      title: formValue.title,

      description:
        formValue.description,

      category:
        formValue.category,

      status:
        'OPEN'

    };

    console.log(
      'Complaint being sent:',
      complaint
    );

    this.complaintService
      .create(complaint as any)
      .subscribe({

        next: () => {

          alert(
            'Complaint added successfully!'
          );

          this.router.navigate([
            '/complaints'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Error adding complaint:',
            error
          );

          alert(
            'Failed to add complaint.'
          );

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/complaints'
    ]);

  }

}