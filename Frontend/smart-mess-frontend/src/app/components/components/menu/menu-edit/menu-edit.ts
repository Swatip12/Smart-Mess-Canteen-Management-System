import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuService } from '../../../../services/services/menu';
import { MessService } from '../../../../services/services/mess';
import { MealService } from '../../../../services/services/meal';

import { Mess } from '../../../../models/models/mess.model';
import { Meal } from '../../../../models/models/meal.model';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-edit.html',
  styleUrl: './menu-edit.css'
})
export class MenuEdit implements OnInit {

  menuForm: FormGroup;
  menuId!: number;

  messes: Mess[] = [];
  meals: Meal[] = [];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private messService: MessService,
    private mealService: MealService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.menuForm = this.fb.group({
      menuDate: ['', Validators.required],
      dayOfWeek: ['', Validators.required],
      mess: [null, Validators.required],
      meal: [null, Validators.required],
      items: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.menuId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadMesses();
    this.loadMeals();
    this.loadMenu();
  }

  loadMesses(): void {
    this.messService.getAll().subscribe({
      next: (data: Mess[]) => {
        this.messes = data;
      },
      error: (error: any) => {
        console.error('Error loading messes:', error);
      }
    });
  }

  loadMeals(): void {
    this.mealService.getAll().subscribe({
      next: (data: Meal[]) => {
        this.meals = data;
      },
      error: (error: any) => {
        console.error('Error loading meals:', error);
      }
    });
  }

  loadMenu(): void {

    this.menuService.getById(this.menuId).subscribe({
      next: (menu) => {
        this.menuForm.patchValue(menu);
      },
      error: (error: any) => {
        console.error('Error loading menu:', error);
        alert('Failed to load menu.');
      }
    });
  }

  setDayOfWeek(): void {

    const dateValue = this.menuForm.get('menuDate')?.value;

    if (dateValue) {

      const date = new Date(dateValue + 'T00:00:00');

      const days = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY'
      ];

      this.menuForm.patchValue({
        dayOfWeek: days[date.getDay()]
      });
    }
  }

  updateMenu(): void {

    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    this.menuService.update(
      this.menuId,
      this.menuForm.value
    ).subscribe({
      next: () => {
        alert('Menu updated successfully!');
        this.router.navigate(['/menus']);
      },
      error: (error: any) => {
        console.error('Error updating menu:', error);
        alert('Failed to update menu.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/menus']);
  }
}