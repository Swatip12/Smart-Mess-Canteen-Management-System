import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { FoodOrderService } from '../../../../services/services/food-order';
import { StudentService } from '../../../../services/services/student';
import { CanteenService } from '../../../../services/services/canteen';
import { FoodItemService } from '../../../../services/services/food-item';

import { Student } from '../../../../models/models/student.model';
import { Canteen } from '../../../../models/models/canteen.model';
import { FoodItem } from '../../../../models/models/food-item.model';

@Component({
  selector: 'app-food-order-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './food-order-add.html',
  styleUrl: './food-order-add.css'
})
export class FoodOrderAdd implements OnInit {

  orderForm: FormGroup;

  students: Student[] = [];
  canteens: Canteen[] = [];
  foodItems: FoodItem[] = [];

  selectedFoodItem: FoodItem | null = null;

  constructor(
    private fb: FormBuilder,
    private foodOrderService: FoodOrderService,
    private studentService: StudentService,
    private canteenService: CanteenService,
    private foodItemService: FoodItemService,
    private router: Router
  ) {

    this.orderForm = this.fb.group({
      studentId: [null, Validators.required],
      canteenId: [null, Validators.required],
      foodItemId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      status: ['PENDING', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadStudents();
    this.loadCanteens();
    this.loadFoodItems();
  }

  loadStudents(): void {

    this.studentService.getAll().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        console.log('Students loaded:', data);
      },
      error: (error: any) => {
        console.error('Error loading students:', error);
      }
    });

  }

  loadCanteens(): void {

    this.canteenService.getAll().subscribe({
      next: (data: Canteen[]) => {
        this.canteens = data;
        console.log('Canteens loaded:', data);
      },
      error: (error: any) => {
        console.error('Error loading canteens:', error);
      }
    });

  }

  loadFoodItems(): void {

    this.foodItemService.getAll().subscribe({
      next: (data: FoodItem[]) => {

        this.foodItems = data.filter(
          item => item.isAvailable !== false
        );

        console.log('Food Items loaded:', this.foodItems);

      },

      error: (error: any) => {
        console.error('Error loading food items:', error);
      }
    });

  }

  onFoodItemChange(): void {

    const foodItemId =
      this.orderForm.get('foodItemId')?.value;

    this.selectedFoodItem =
      this.foodItems.find(
        item => item.id == foodItemId
      ) || null;

  }

  addOrder(): void {

    if (this.orderForm.invalid) {

      this.orderForm.markAllAsTouched();

      return;
    }

    const formValue = this.orderForm.value;

    const selectedItem = this.foodItems.find(
      item => item.id == formValue.foodItemId
    );

    if (!selectedItem) {

      alert('Please select a food item.');

      return;
    }

    const order = {

      student: {
        id: formValue.studentId
      },

      canteen: {
        id: formValue.canteenId
      },

      status: 'PENDING',

      orderItems: [

        {
          foodItem: {
            id: formValue.foodItemId
          },

          quantity: formValue.quantity,

          unitPrice: selectedItem.price,

          subTotal:
            Number(selectedItem.price) *
            Number(formValue.quantity)
        }

      ]

    };

    console.log('Order being sent:', order);

    this.foodOrderService.create(order as any).subscribe({

      next: () => {

        alert('Order placed successfully!');

        this.router.navigate(['/orders']);

      },

      error: (error: any) => {

        console.error('Error adding order:', error);

        alert('Failed to place order.');

      }

    });

  }

  cancel(): void {

    this.router.navigate(['/orders']);

  }

}