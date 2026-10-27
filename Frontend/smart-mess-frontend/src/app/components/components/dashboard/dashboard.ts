import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReportService } from '../../../services/services/report';
import { NoticeService } from '../../../services/services/notice';
import { Notice } from '../../../models/models/notice.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {

  totalStudents: number = 0;
  activeSubscriptions: number = 0;
  pendingOrders: number = 0;
  openComplaints: number = 0;
  lowStockCount: number = 0;
  totalRevenue: number = 0;
  todayRevenue: number = 0;

  recentNotices: Notice[] = [];
  lastRefreshedAt: string = '';
  isRefreshing: boolean = false;
  private refreshTimer: any = null;

  constructor(
    private reportService: ReportService,
    private noticeService: NoticeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshAll();
    // Auto-refresh real-time counts every 15 seconds
    this.refreshTimer = setInterval(() => {
      this.refreshAll(false);
    }, 15000);
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  refreshAll(showIndicator: boolean = true): void {
    if (showIndicator) {
      this.isRefreshing = true;
      this.cdr.markForCheck();
    }
    this.loadSummary();
    this.loadRecentNotices();
  }

  loadSummary(): void {
    this.reportService.getDashboardSummary().subscribe({
      next: (data) => {
        this.totalStudents = data.totalStudents || 0;
        this.activeSubscriptions = data.activeSubscriptions || 0;
        this.pendingOrders = data.pendingOrders || 0;
        this.openComplaints = data.openComplaints || 0;
        this.lowStockCount = data.lowStockCount || 0;
        this.totalRevenue = data.totalRevenue || 0;
        this.todayRevenue = data.todayRevenue || 0;
        this.isRefreshing = false;
        this.lastRefreshedAt = new Date().toLocaleTimeString();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load dashboard summary', err);
        this.isRefreshing = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadRecentNotices(): void {
    this.noticeService.getAll().subscribe({
      next: (data: Notice[]) => {
        this.recentNotices = (data || []).slice(0, 5);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading notices', err);
        this.cdr.markForCheck();
      }
    });
  }
}
