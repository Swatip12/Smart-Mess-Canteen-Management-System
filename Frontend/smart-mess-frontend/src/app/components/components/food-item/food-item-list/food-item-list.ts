import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { FoodItem } from '../../../../models/models/food-item.model';
import { FoodItemService } from '../../../../services/services/food-item';

@Component({
  selector: 'app-food-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './food-item-list.html',
  styleUrl: './food-item-list.css'
})
export class FoodItemList implements OnInit {

  foodItems: FoodItem[] = [];
  isLoading = false;

  constructor(
    private foodItemService: FoodItemService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFoodItems();
  }

  loadFoodItems(): void {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.foodItemService.getAll().subscribe({
      next: (data: FoodItem[]) => {
        this.foodItems = data || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading food items:', error);
        this.foodItems = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  deleteFoodItem(id: number): void {
    if (confirm('Are you sure you want to delete this food item?')) {
      this.foodItemService.delete(id).subscribe({
        next: () => {
          this.loadFoodItems();
        },
        error: (error: any) => {
          console.error('Error deleting food item:', error);
        }
      });
    }
  }

  editFoodItem(id: number): void {
    this.router.navigate(['/food-items/edit', id]);
  }
}
