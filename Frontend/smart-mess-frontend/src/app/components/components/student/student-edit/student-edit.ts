import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from '../../../../services/services/student';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.html',
  styleUrl: './student-edit.css'
})
export class StudentEdit implements OnInit {

  studentForm: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [''],
      rollNumber: [''],
      department: [''],
      hostelName: [''],
      roomNumber: ['']
    });
  }

  ngOnInit(): void {

    this.studentId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.studentService.getById(this.studentId).subscribe({
      next: (student: any) => {
        this.studentForm.patchValue(student);
      },
      error: (error: any) => {
        console.error('Error loading student:', error);
      }
    });
  }

  updateStudent(): void {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.studentService
      .update(this.studentId, this.studentForm.value)
      .subscribe({
        next: () => {
          alert('Student updated successfully!');
          this.router.navigate(['/students']);
        },
        error: (error: any) => {
          console.error('Error updating student:', error);
          alert('Failed to update student.');
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}