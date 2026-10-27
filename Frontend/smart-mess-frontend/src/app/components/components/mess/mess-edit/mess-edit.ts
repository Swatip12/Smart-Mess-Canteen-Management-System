import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessService } from '../../../../services/services/mess';

@Component({
  selector: 'app-mess-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mess-edit.html',
  styleUrl: './mess-edit.css'
})
export class MessEdit implements OnInit {

  messForm: FormGroup;
  messId!: number;

  constructor(
    private fb: FormBuilder,
    private messService: MessService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {

    this.messId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.messService.getById(this.messId).subscribe({
      next: (mess) => {
        this.messForm.patchValue(mess);
      },
      error: (error: any) => {
        console.error('Error loading mess:', error);
        alert('Failed to load mess.');
      }
    });
  }

  updateMess(): void {

    if (this.messForm.invalid) {
      this.messForm.markAllAsTouched();
      return;
    }

    this.messService.update(
      this.messId,
      this.messForm.value
    ).subscribe({
      next: () => {
        alert('Mess updated successfully!');
        this.router.navigate(['/messes']);
      },
      error: (error: any) => {
        console.error('Error updating mess:', error);
        alert('Failed to update mess.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/messes']);
  }
}