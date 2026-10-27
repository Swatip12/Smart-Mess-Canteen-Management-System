import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-menu.html',
  styleUrl: './student-menu.css'
})
export class StudentMenu implements OnInit {

  menus: any[] = [];
  meals: any[] = [];
  messes: any[] = [];
  selectedMess: number | null = null;
  selectedDate: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadMesses();
    this.loadMeals();
  }

  loadMesses(): void {
    this.http.get<any[]>('http://localhost:8080/api/messes').subscribe({
      next: (data) => {
        this.messes = data;
        if (data.length > 0) {
          this.selectedMess = data[0].id;
          this.loadMenu();
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading messes:', error);
        this.errorMessage = 'Failed to load mess information';
        this.cdr.markForCheck();
      }
    });
  }

  loadMeals(): void {
    this.http.get<any[]>('http://localhost:8080/api/meals').subscribe({
      next: (data) => {
        this.meals = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading meals:', error);
        this.cdr.markForCheck();
      }
    });
  }

  loadMenu(): void {
    if (!this.selectedMess || !this.selectedDate) return;

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<any[]>(`http://localhost:8080/api/menus/mess/${this.selectedMess}/date/${this.selectedDate}`).subscribe({
      next: (data) => {
        this.menus = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading menu:', error);
        this.errorMessage = 'No menu scheduled for this date and mess facility';
        this.menus = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onMessChange(): void {
    this.loadMenu();
  }

  onDateChange(): void {
    this.loadMenu();
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }

  getMealName(menu: any): string {
    if (!menu) return 'Meal';
    if (menu.meal?.name) return menu.meal.name;
    if (typeof menu.meal === 'string') return menu.meal;
    const mealId = menu.mealId || menu.meal?.id;
    if (mealId) {
      const meal = this.meals.find(m => m.id === mealId);
      if (meal) return meal.name;
    }
    return 'Meal Session';
  }
}
