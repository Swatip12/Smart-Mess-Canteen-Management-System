import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogService } from '../../../../services/services/audit-log';
import { AuditLog } from '../../../../models/models/audit-log.model';

@Component({
  selector: 'app-audit-log-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-log-list.html',
  styleUrl: './audit-log-list.css'
})
export class AuditLogList implements OnInit {
  logs: AuditLog[] = [];
  loading: boolean = false;

  constructor(
    private auditService: AuditLogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.auditService.getAll().subscribe({
      next: (data) => {
        this.logs = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load audit logs', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
