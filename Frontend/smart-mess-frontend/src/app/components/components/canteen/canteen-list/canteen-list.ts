import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CanteenService } from '../../../../services/services/canteen';

@Component({
  selector: 'app-canteen-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canteen-list.html',
  styleUrl: './canteen-list.css'
})
export class CanteenList implements OnInit {

  canteens: any[] = [];
  loading = false;

  constructor(
    private canteenService: CanteenService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCanteens();
  }

  loadCanteens(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.canteenService.getAll().subscribe({
      next: (data: any[]) => {
        this.canteens = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('CANTEEN API ERROR:', error);
        this.canteens = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  addCanteen(): void {
    this.router.navigate(['/canteens/add']);
  }

  editCanteen(id: number): void {
    this.router.navigate(['/canteens/edit', id]);
  }

  deleteCanteen(id: number): void {
    if (!confirm('Are you sure you want to delete this canteen?')) {
      return;
    }

    this.canteenService.delete(id).subscribe({
      next: () => {
        alert('Canteen deleted successfully!');
        this.loadCanteens();
      },
      error: (error: any) => {
        console.error('DELETE ERROR:', error);
        alert('Failed to delete canteen.');
      }
    });
  }
}
