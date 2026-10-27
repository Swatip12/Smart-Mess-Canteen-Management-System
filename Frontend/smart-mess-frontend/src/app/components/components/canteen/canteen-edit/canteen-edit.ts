import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CanteenService } from '../../../../services/services/canteen';

@Component({
  selector: 'app-canteen-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './canteen-edit.html',
  styleUrl: './canteen-edit.css'
})
export class CanteenEdit implements OnInit {

  canteenForm: FormGroup;
  canteenId!: number;

  constructor(
    private fb: FormBuilder,
    private canteenService: CanteenService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {

    this.canteenId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.canteenService.getById(this.canteenId).subscribe({
      next: (canteen) => {
        this.canteenForm.patchValue(canteen);
      },
      error: (error: any) => {
        console.error('Error loading canteen:', error);
        alert('Failed to load canteen.');
      }
    });
  }

  updateCanteen(): void {

    if (this.canteenForm.invalid) {
      this.canteenForm.markAllAsTouched();
      return;
    }

    this.canteenService.update(
      this.canteenId,
      this.canteenForm.value
    ).subscribe({
      next: () => {
        alert('Canteen updated successfully!');
        this.router.navigate(['/canteens']);
      },
      error: (error: any) => {
        console.error('Error updating canteen:', error);
        alert('Failed to update canteen.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/canteens']);
  }
}