import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SystemSettingService } from '../../../../services/services/system-setting';
import { SystemSetting } from '../../../../models/models/system-setting.model';

@Component({
  selector: 'app-settings-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-list.html',
  styleUrl: './settings-list.css'
})
export class SettingsList implements OnInit {
  settings: SystemSetting[] = [];
  loading: boolean = false;
  message: string = '';
  errorMessage: string = '';

  constructor(
    private settingService: SystemSettingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.settingService.getAll().subscribe({
      next: (data) => {
        this.settings = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load settings', err);
        this.errorMessage = 'Failed to load business rules and system settings';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  saveSetting(s: SystemSetting): void {
    this.settingService.saveOrUpdate(s.settingKey, s.settingValue, s.description, s.category).subscribe({
      next: () => {
        this.message = `Updated parameter "${s.settingKey}" successfully.`;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.message = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (err) => {
        alert('Failed to update setting');
        this.cdr.markForCheck();
      }
    });
  }
}
