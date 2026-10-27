import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Complaint } from '../../../../models/models/complaint.model';
import { ComplaintService } from '../../../../services/services/complaint';

@Component({
  selector: 'app-complaint-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './complaint-list.html',
  styleUrl: './complaint-list.css'
})
export class ComplaintList implements OnInit {

  complaints: Complaint[] = [];
  loading: boolean = false;

  constructor(
    private complaintService: ComplaintService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.complaintService.getAll().subscribe({
      next: (data: Complaint[]) => {
        this.complaints = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading complaints:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'OPEN':
        return 'status-open';
      case 'IN_PROGRESS':
        return 'status-progress';
      case 'RESOLVED':
        return 'status-resolved';
      case 'CLOSED':
        return 'status-closed';
      default:
        return '';
    }
  }

  resolveComplaint(id: number): void {
    const resolution = prompt('Enter resolution:');
    if (!resolution || resolution.trim() === '') {
      return;
    }

    this.complaintService.resolve(id, resolution).subscribe({
      next: () => {
        alert('Complaint resolved successfully!');
        this.loadComplaints();
      },
      error: (error: any) => {
        console.error('Error resolving complaint:', error);
        alert('Failed to resolve complaint.');
        this.cdr.markForCheck();
      }
    });
  }
}
