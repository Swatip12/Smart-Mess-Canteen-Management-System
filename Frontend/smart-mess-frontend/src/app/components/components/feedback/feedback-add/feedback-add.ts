import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { FeedbackService } from '../../../../services/services/feedback';
import { StudentService } from '../../../../services/services/student';
import { MessService } from '../../../../services/services/mess';

import { Student } from '../../../../models/models/student.model';
import { Mess } from '../../../../models/models/mess.model';

@Component({
  selector: 'app-feedback-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback-add.html',
  styleUrl: './feedback-add.css'
})
export class FeedbackAdd implements OnInit {

  feedbackForm: FormGroup;

  students: Student[] = [];
  messes: Mess[] = [];

  categories: string[] = [
    'FOOD_QUALITY',
    'CLEANLINESS',
    'SERVICE',
    'TIMING'
  ];

  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private studentService: StudentService,
    private messService: MessService,
    private router: Router
  ) {

    this.feedbackForm = this.fb.group({

      student: [null, Validators.required],

      mess: [null, Validators.required],

      rating: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ]
      ],

      comment: [''],

      category: [
        null,
        Validators.required
      ]

    });

  }

  ngOnInit(): void {

    this.loadStudents();
    this.loadMesses();

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

  loadMesses(): void {

    this.messService.getAll().subscribe({

      next: (data: Mess[]) => {

        this.messes = data;

        console.log(
          'Messes loaded:',
          data
        );

      },

      error: (error: any) => {

        console.error(
          'Error loading messes:',
          error
        );

      }

    });

  }

  addFeedback(): void {

    if (this.feedbackForm.invalid) {

      this.feedbackForm.markAllAsTouched();

      return;

    }

    const formValue =
      this.feedbackForm.value;

    const feedback = {

      student: {
        id: formValue.student
      },

      mess: {
        id: formValue.mess
      },

      rating: formValue.rating,

      comment: formValue.comment,

      category: formValue.category

    };

    console.log(
      'Feedback being sent:',
      feedback
    );

    this.feedbackService
      .create(feedback as any)
      .subscribe({

        next: () => {

          alert(
            'Feedback added successfully!'
          );

          this.router.navigate([
            '/feedbacks'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Error adding feedback:',
            error
          );

          alert(
            'Failed to add feedback.'
          );

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/feedbacks'
    ]);

  }

}