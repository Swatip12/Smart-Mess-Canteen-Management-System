import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-order.html',
  styleUrl: './student-order.css'
})
export class StudentOrder {

  canteens: any[] = [];
  foodItems: any[] = [];
  selectedCanteen: number | null = null;
  cart: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loadCanteens();
  }

  loadCanteens(): void {
    this.http.get<any[]>('http://localhost:8080/api/canteens').subscribe({
      next: (data) => {
        this.canteens = data.filter(c => c.isActive);
        if (this.canteens.length > 0) {
          this.selectedCanteen = this.canteens[0].id;
          this.loadFoodItems();
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading canteens:', error);
        this.errorMessage = 'Failed to load canteen information';
        this.cdr.markForCheck();
      }
    });
  }

  loadFoodItems(): void {
    if (!this.selectedCanteen) return;

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<any[]>(`http://localhost:8080/api/food-items/canteen/${this.selectedCanteen}/available`).subscribe({
      next: (data) => {
        this.foodItems = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading food items:', error);
        this.errorMessage = 'Failed to load food items for this canteen';
        this.foodItems = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onCanteenChange(): void {
    this.cart = [];
    this.loadFoodItems();
  }

  addToCart(foodItem: any): void {
    const existingItem = this.cart.find(item => item.foodItemId === foodItem.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        foodItemId: foodItem.id,
        name: foodItem.name,
        price: foodItem.price,
        quantity: 1,
        subTotal: foodItem.price
      });
    }
    this.updateCartTotals();
    this.cdr.markForCheck();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.updateCartTotals();
    this.cdr.markForCheck();
  }

  updateQuantity(index: number, change: number): void {
    const item = this.cart[index];
    item.quantity += change;
    if (item.quantity <= 0) {
      this.removeFromCart(index);
    } else {
      item.subTotal = item.price * item.quantity;
      this.updateCartTotals();
    }
    this.cdr.markForCheck();
  }

  updateCartTotals(): void {
    this.cart.forEach(item => {
      item.subTotal = item.price * item.quantity;
    });
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + item.subTotal, 0);
  }

  placeOrder(): void {
    if (this.cart.length === 0) {
      this.errorMessage = 'Please add items to your cart before checking out';
      this.cdr.markForCheck();
      return;
    }

    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      this.router.navigate(['/student-login']);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.markForCheck();

    const order = {
      studentId: Number(studentId),
      student: { id: Number(studentId) },
      canteenId: Number(this.selectedCanteen),
      canteen: { id: Number(this.selectedCanteen) },
      orderItems: this.cart.map(item => ({
        foodItemId: Number(item.foodItemId),
        foodItem: { id: Number(item.foodItemId) },
        quantity: Number(item.quantity),
        unitPrice: Number(item.price),
        subTotal: Number(item.subTotal)
      })),
      totalAmount: this.getCartTotal()
    };

    this.http.post<any>('http://localhost:8080/api/orders', order).subscribe({
      next: (response) => {
        this.successMessage = 'Order placed successfully! Track your meal in My Orders.';
        this.cart = [];
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.errorMessage = error.error?.message || 'Failed to place order. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
