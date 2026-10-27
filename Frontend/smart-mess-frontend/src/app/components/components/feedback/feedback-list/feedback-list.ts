import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Feedback } from '../../../../models/models/feedback.model';
import { FeedbackService } from '../../../../services/services/feedback';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './feedback-list.html',
  styleUrl: './feedback-list.css'
})
export class FeedbackList implements OnInit {

  feedbacks: Feedback[] = [];
  loading: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.feedbackService.getAll().subscribe({
      next: (data: Feedback[]) => {
        this.feedbacks = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading feedbacks:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getStars(rating: number = 0): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
