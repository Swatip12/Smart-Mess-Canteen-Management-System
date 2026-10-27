import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MealService } from '../../../../services/services/meal';
import { MessService } from '../../../../services/services/mess';
import { Mess } from '../../../../models/models/mess.model';

@Component({
  selector: 'app-meal-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './meal-edit.html',
  styleUrl: './meal-edit.css',
})
export class MealEdit implements OnInit {
  mealForm: FormGroup;
  messes: Mess[] = [];
  mealId!: number;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private mealService: MealService,
    private messService: MessService,
    private route: ActivatedRoute,
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
    this.mealId = Number(this.route.snapshot.paramMap.get('id'));

    this.messService.getAll().subscribe({
      next: (data) => (this.messes = data),
      error: (err) => console.error('Error fetching messes:', err)
    });

    if (this.mealId) {
      this.mealService.getById(this.mealId).subscribe({
        next: (meal) => {
          this.mealForm.patchValue({
            name: meal.name,
            serveTime: meal.serveTime,
            description: meal.description,
            messId: meal.mess?.id || ''
          });
        },
        error: (err) => {
          console.error('Error fetching meal:', err);
          alert('Could not find meal session.');
          this.router.navigate(['/meals']);
        }
      });
    }
  }

  updateMeal(): void {
    if (this.mealForm.invalid) return;

    this.submitting = true;
    const formVal = this.mealForm.value;
    const payload: any = {
      id: this.mealId,
      name: formVal.name,
      serveTime: formVal.serveTime,
      description: formVal.description,
      mess: formVal.messId ? { id: Number(formVal.messId) } : null
    };

    this.mealService.update(this.mealId, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/meals']);
      },
      error: (err) => {
        console.error('Error updating meal:', err);
        this.submitting = false;
        alert('Failed to update meal session.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/meals']);
  }
}
