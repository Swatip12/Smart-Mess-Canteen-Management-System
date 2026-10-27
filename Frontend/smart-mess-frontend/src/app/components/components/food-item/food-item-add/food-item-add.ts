import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { FoodItemService } from '../../../../services/services/food-item';
import { CanteenService } from '../../../../services/services/canteen';

import { Canteen } from '../../../../models/models/canteen.model';

@Component({
  selector: 'app-food-item-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './food-item-add.html',
  styleUrl: './food-item-add.css'
})
export class FoodItemAdd implements OnInit {

  foodItemForm: FormGroup;
  canteens: Canteen[] = [];

  constructor(
    private fb: FormBuilder,
    private foodItemService: FoodItemService,
    private canteenService: CanteenService,
    private router: Router
  ) {

    this.foodItemForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      isAvailable: [true],
      canteen: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadCanteens();
  }

  loadCanteens(): void {

    this.canteenService.getAll().subscribe({
      next: (data: Canteen[]) => {
        this.canteens = data;
      },
      error: (error: any) => {
        console.error('Error loading canteens:', error);
      }
    });

  }

  addFoodItem(): void {

    if (this.foodItemForm.invalid) {
      this.foodItemForm.markAllAsTouched();
      return;
    }

    this.foodItemService.create(
      this.foodItemForm.value
    ).subscribe({
      next: () => {
        alert('Food item added successfully!');
        this.router.navigate(['/food-items']);
      },
      error: (error: any) => {
        console.error('Error adding food item:', error);
        alert('Failed to add food item.');
      }
    });

  }

  cancel(): void {
    this.router.navigate(['/food-items']);
  }
}