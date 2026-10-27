import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { CanteenService } from '../../../../services/services/canteen';

@Component({
  selector: 'app-canteen-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './canteen-add.html',
  styleUrl: './canteen-add.css'
})
export class CanteenAdd {

  canteenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private canteenService: CanteenService,
    private router: Router
  ) {
    this.canteenForm = this.fb.group({
      name: ['', Validators.required],
      location: [''],
      openingTime: [''],
      closingTime: [''],
      contactNumber: [''],
      isActive: [true]
    });
  }

  addCanteen(): void {

    if (this.canteenForm.invalid) {
      this.canteenForm.markAllAsTouched();
      return;
    }

    this.canteenService.create(this.canteenForm.value).subscribe({
      next: () => {
        alert('Canteen added successfully!');
        this.router.navigate(['/canteens']);
      },
      error: (error: any) => {
        console.error('Error adding canteen:', error);
        alert('Failed to add canteen.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/canteens']);
  }
}