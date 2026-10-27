import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects || event.url;
    });
  }

  isAdminRoute(): boolean {
    const url = this.currentUrl;
    if (!url || url === '/' || url === '/home') return false;
    if (url.startsWith('/login') || url.startsWith('/register')) return false;
    if (url.startsWith('/student-')) return false;
    return true;
  }

  getAdminName(): string {
    return localStorage.getItem('adminName') || 'Admin';
  }

  logoutAdmin(): void {
    localStorage.removeItem('adminId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminName');
    this.router.navigate(['/login']);
  }
}
