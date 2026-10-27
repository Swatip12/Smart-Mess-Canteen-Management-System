import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Mess } from '../../../../models/models/mess.model';
import { MessService } from '../../../../services/services/mess';

@Component({
  selector: 'app-mess-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mess-list.html',
  styleUrl: './mess-list.css'
})
export class MessList implements OnInit {

  messes: Mess[] = [];
  isLoading = false;

  constructor(
    private messService: MessService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMesses();
  }

  loadMesses(): void {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.messService.getAll().subscribe({
      next: (data: Mess[]) => {
        this.messes = data || [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading messes:', error);
        this.messes = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  deleteMess(id: number): void {
    if (confirm('Are you sure you want to delete this mess?')) {
      this.messService.delete(id).subscribe({
        next: () => {
          this.loadMesses();
        },
        error: (error: any) => {
          console.error('Error deleting mess:', error);
        }
      });
    }
  }

  editMess(id: number): void {
    this.router.navigate(['/messes/edit', id]);
  }
}
