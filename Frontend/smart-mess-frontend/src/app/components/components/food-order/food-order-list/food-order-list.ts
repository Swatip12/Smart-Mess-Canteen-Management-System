import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FoodOrder } from '../../../../models/models/food-order.model';
import { FoodOrderService } from '../../../../services/services/food-order';
import { ReportService } from '../../../../services/services/report';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './food-order-list.html',
  styleUrl: './food-order-list.css'
})
export class FoodOrderList implements OnInit {

  orders: FoodOrder[] = [];
  filteredOrders: FoodOrder[] = [];
  selectedStatus: string = 'ALL';

  statuses: string[] = [
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'READY',
    'DELIVERED',
    'CANCELLED'
  ];

  constructor(
    private foodOrderService: FoodOrderService,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.foodOrderService.getAll().subscribe({
      next: (data: FoodOrder[]) => {
        this.orders = (data || []).sort((a, b) => (b.id || 0) - (a.id || 0));
        this.filterOrders();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading orders:', error);
        this.cdr.markForCheck();
      }
    });
  }

  filterOrders(): void {
    if (this.selectedStatus === 'ALL') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        order => order.status === this.selectedStatus
      );
    }
    this.cdr.markForCheck();
  }

  updateStatus(id: number, status: string): void {
    this.foodOrderService
      .updateStatus(id, status)
      .subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (error: any) => {
          console.error('Error updating order status:', error);
          alert(error.error?.message || 'Failed to update order status.');
          this.cdr.markForCheck();
        }
      });
  }

  exportCsv(): void {
    this.reportService.downloadOrdersCsv().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Failed to download CSV')
    });
  }
}
