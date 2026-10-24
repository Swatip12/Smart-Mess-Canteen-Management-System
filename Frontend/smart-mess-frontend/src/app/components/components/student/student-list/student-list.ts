import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { StudentService } from '../../../../services/services/student';
import { Student } from '../../../../models/models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit {

  students: Student[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }
loadStudents(): void {
  this.loading = true;
  this.errorMessage = '';

  this.studentService.getAll().subscribe({
    next: (data: Student[]) => {
      console.log('STUDENTS FROM API:', data);

      this.students = Array.isArray(data) ? data : [];
      this.loading = false;

      console.log('TOTAL STUDENTS:', this.students.length);
      console.log('LOADING:', this.loading);
    },

    error: (error: any) => {
      console.error('STUDENT API ERROR:', error);

      this.students = [];
      this.loading = false;
      this.errorMessage = 'Unable to load students. Please try again.';
    },

    complete: () => {
      console.log('Student API request completed.');
    }
  });
}
  addStudent(): void {
    this.router.navigate(['/students/add']);
  }

  editStudent(id: number): void {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: number): void {

    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    this.studentService.delete(id).subscribe({

      next: () => {

        alert('Student deleted successfully.');

        this.loadStudents();
      },

      error: (error: any) => {

        console.error('DELETE STUDENT ERROR:', error);

        alert('Failed to delete student.');
      }

    });
  }
}