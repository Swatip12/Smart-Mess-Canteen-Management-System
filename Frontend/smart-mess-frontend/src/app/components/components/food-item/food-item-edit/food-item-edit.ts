import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FoodItemService } from '../../../../services/services/food-item';
import { CanteenService } from '../../../../services/services/canteen';

import { Canteen } from '../../../../models/models/canteen.model';

@Component({
  selector: 'app-food-item-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './food-item-edit.html',
  styleUrl: './food-item-edit.css'
})
export class FoodItemEdit implements OnInit {

  foodItemForm: FormGroup;
  foodItemId!: number;

  canteens: Canteen[] = [];

  constructor(
    private fb: FormBuilder,
    private foodItemService: FoodItemService,
    private canteenService: CanteenService,
    private route: ActivatedRoute,
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

    this.foodItemId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadCanteens();
    this.loadFoodItem();
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

  loadFoodItem(): void {

    this.foodItemService.getById(this.foodItemId).subscribe({
      next: (foodItem) => {
        this.foodItemForm.patchValue(foodItem);
      },
      error: (error: any) => {
        console.error('Error loading food item:', error);
        alert('Failed to load food item.');
      }
    });

  }

  updateFoodItem(): void {

    if (this.foodItemForm.invalid) {
      this.foodItemForm.markAllAsTouched();
      return;
    }

    this.foodItemService.update(
      this.foodItemId,
      this.foodItemForm.value
    ).subscribe({
      next: () => {
        alert('Food item updated successfully!');
        this.router.navigate(['/food-items']);
      },
      error: (error: any) => {
        console.error('Error updating food item:', error);
        alert('Failed to update food item.');
      }
    });

  }

  cancel(): void {
    this.router.navigate(['/food-items']);
  }
}