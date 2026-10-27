import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Meal } from '../../../../models/models/meal.model';
import { MealService } from '../../../../services/services/meal';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meal-list.html',
  styleUrl: './meal-list.css',
})
export class MealList implements OnInit {
  meals: Meal[] = [];
  isLoading = false;

  constructor(
    private mealService: MealService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.mealService.getAll().subscribe({
      next: (data) => {
        this.meals = data || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching meals:', err);
        this.meals = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  editMeal(id: number): void {
    this.router.navigate(['/meals/edit', id]);
  }

  deleteMeal(id: number): void {
    if (confirm('Are you sure you want to delete this meal timing?')) {
      this.mealService.delete(id).subscribe({
        next: () => {
          this.loadMeals();
        },
        error: (err) => {
          console.error('Error deleting meal:', err);
          alert('Could not delete meal. It may be linked to existing menus or attendance.');
        }
      });
    }
  }
}
