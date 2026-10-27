import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Notice } from '../../../../models/models/notice.model';
import { NoticeService } from '../../../../services/services/notice';

@Component({
  selector: 'app-notice-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notice-list.html',
  styleUrl: './notice-list.css'
})
export class NoticeList implements OnInit {

  notices: Notice[] = [];
  loading: boolean = false;

  constructor(
    private noticeService: NoticeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.noticeService.getAll().subscribe({
      next: (data: Notice[]) => {
        this.notices = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading notices:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getTypeClass(type?: string): string {
    switch (type) {
      case 'GENERAL':
        return 'type-general';
      case 'URGENT':
        return 'type-urgent';
      case 'MAINTENANCE':
        return 'type-maintenance';
      case 'HOLIDAY':
        return 'type-holiday';
      default:
        return '';
    }
  }

  toggleNotice(notice: Notice): void {
    if (!notice.id) {
      return;
    }

    const updatedNotice: Notice = {
      ...notice,
      isActive: !notice.isActive
    };

    this.noticeService.update(notice.id, updatedNotice).subscribe({
      next: () => {
        alert(
          updatedNotice.isActive
            ? 'Notice activated successfully!'
            : 'Notice deactivated successfully!'
        );
        this.loadNotices();
      },
      error: (error: any) => {
        console.error('Error updating notice:', error);
        alert('Failed to update notice.');
        this.cdr.markForCheck();
      }
    });
  }
}
