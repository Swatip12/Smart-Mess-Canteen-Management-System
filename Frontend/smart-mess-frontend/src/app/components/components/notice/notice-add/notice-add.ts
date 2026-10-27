import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { NoticeService } from '../../../../services/services/notice';

@Component({
  selector: 'app-notice-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notice-add.html',
  styleUrl: './notice-add.css'
})
export class NoticeAdd {

  noticeForm: FormGroup;

  types: string[] = [
    'GENERAL',
    'URGENT',
    'MAINTENANCE',
    'HOLIDAY'
  ];

  constructor(
    private fb: FormBuilder,
    private noticeService: NoticeService,
    private router: Router
  ) {

    this.noticeForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      content: [''],

      type: [
        'GENERAL',
        Validators.required
      ],

      validUntil: [''],

      isActive: [true]

    });

  }

  addNotice(): void {

    if (this.noticeForm.invalid) {

      this.noticeForm.markAllAsTouched();

      return;

    }

    const notice = this.noticeForm.value;

    console.log(
      'Notice being sent:',
      notice
    );

    this.noticeService
      .create(notice)
      .subscribe({

        next: () => {

          alert(
            'Notice added successfully!'
          );

          this.router.navigate([
            '/notices'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Error adding notice:',
            error
          );

          alert(
            'Failed to add notice.'
          );

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/notices'
    ]);

  }

}