import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Attendance } from '../../../../models/models/attendance.model';
import { AttendanceService } from '../../../../services/services/attendance';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css'
})
export class AttendanceList implements OnInit {

  attendanceRecords: Attendance[] = [];
  filteredRecords: Attendance[] = [];

  fromDate: string = '';
  toDate: string = '';
  loading: boolean = false;

  constructor(
    private attendanceService: AttendanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.attendanceService.getAll().subscribe({
      next: (data: Attendance[]) => {
        this.attendanceRecords = data || [];
        this.filteredRecords = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading attendance:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  filterByDateRange(): void {
    if (!this.fromDate && !this.toDate) {
      this.filteredRecords = this.attendanceRecords;
      this.cdr.markForCheck();
      return;
    }

    this.filteredRecords = this.attendanceRecords.filter(record => {
      const recordDate = record.attendanceDate || '';
      const fromMatch = !this.fromDate || recordDate >= this.fromDate;
      const toMatch = !this.toDate || recordDate <= this.toDate;
      return fromMatch && toMatch;
    });
    this.cdr.markForCheck();
  }

  resetFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.filteredRecords = this.attendanceRecords;
    this.cdr.markForCheck();
  }

  clearFilter(): void {
    this.resetFilter();
  }
}
