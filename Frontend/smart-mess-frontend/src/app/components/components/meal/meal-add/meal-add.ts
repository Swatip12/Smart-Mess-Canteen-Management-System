import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MealService } from '../../../../services/services/meal';
import { MessService } from '../../../../services/services/mess';
import { Mess } from '../../../../models/models/mess.model';

@Component({
  selector: 'app-meal-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './meal-add.html',
  styleUrl: './meal-add.css',
})
export class MealAdd implements OnInit {
  mealForm: FormGroup;
  messes: Mess[] = [];
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private mealService: MealService,
    private messService: MessService,
    private router: Router
  ) {
    this.mealForm = this.fb.group({
      name: ['', Validators.required],
      serveTime: ['', Validators.required],
      description: [''],
      messId: ['']
    });
  }

  ngOnInit(): void {
    this.messService.getAll().subscribe({
      next: (data) => {
        this.messes = data;
      },
      error: (err) => console.error('Error fetching messes:', err)
    });
  }

  addMeal(): void {
    if (this.mealForm.invalid) return;

    this.submitting = true;
    const formVal = this.mealForm.value;
    const payload: any = {
      name: formVal.name,
      serveTime: formVal.serveTime,
      description: formVal.description,
      mess: formVal.messId ? { id: Number(formVal.messId) } : null
    };

    this.mealService.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/meals']);
      },
      error: (err) => {
        console.error('Error creating meal:', err);
        this.submitting = false;
        alert('Failed to create meal timing.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meals']);
  }
}
