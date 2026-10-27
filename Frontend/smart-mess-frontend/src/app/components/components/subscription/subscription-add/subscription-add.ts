import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from '../../../../models/models/subscription.model';
import { SubscriptionService } from '../../../../services/services/subscription';

import { StudentService } from '../../../../services/services/student';
import { MessService } from '../../../../services/services/mess';

@Component({
  selector: 'app-subscription-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './subscription-add.html',
  styleUrl: './subscription-add.css'
})
export class SubscriptionAdd implements OnInit {

  students: any[] = [];
  messes: any[] = [];

  subscription: Subscription = {
    student: null,
    mess: null,
    startDate: '',
    endDate: '',
    plan: 'MONTHLY',
    status: 'ACTIVE',
    amount: 0
  };

  loading = false;
  errorMessage = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private studentService: StudentService,
    private messService: MessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadMesses();
  }

  loadStudents(): void {

    this.studentService.getAll().subscribe({

      next: (data: any[]) => {

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

      next: (data: any[]) => {

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

  saveSubscription(): void {

    this.errorMessage = '';

    if (
      !this.subscription.student ||
      !this.subscription.mess ||
      !this.subscription.startDate ||
      !this.subscription.endDate ||
      !this.subscription.plan
    ) {

      this.errorMessage =
        'Please fill all required fields.';

      return;

    }

    this.loading = true;

    this.subscriptionService
      .create(this.subscription)
      .subscribe({

        next: (response: Subscription) => {

          console.log(
            'Subscription created:',
            response
          );

          this.loading = false;

          this.router.navigate([
            '/subscriptions'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Error creating subscription:',
            error
          );

          this.loading = false;

          this.errorMessage =
            'Unable to create subscription.';

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/subscriptions'
    ]);

  }

}