import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessService } from '../../../../services/services/mess';

@Component({
  selector: 'app-mess-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mess-add.html',
  styleUrl: './mess-add.css'
})
export class MessAdd {

  messForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messService: MessService,
    private router: Router
  ) {
    this.messForm = this.fb.group({
      name: ['', Validators.required],
      location: [''],
      contactNumber: [''],
      capacity: [null],
      type: ['VEG', Validators.required]
    });
  }

  addMess(): void {

    if (this.messForm.invalid) {
      this.messForm.markAllAsTouched();
      return;
    }

    this.messService.create(this.messForm.value).subscribe({
      next: () => {
        alert('Mess added successfully!');
        this.router.navigate(['/messes']);
      },
      error: (error: any) => {
        console.error('Error adding mess:', error);
        alert('Failed to add mess.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/messes']);
  }
}