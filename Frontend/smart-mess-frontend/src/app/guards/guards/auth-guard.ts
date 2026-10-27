import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const adminId = localStorage.getItem('adminId');
  const studentId = localStorage.getItem('studentId');

  const isStudentRoute = state.url.startsWith('/student');

  if (isStudentRoute) {
    if (studentId) {
      return true;
    }
    inject(Router).navigate(['/student-login']);
    return false;
  }

  if (adminId) {
    return true;
  }

  inject(Router).navigate(['/login']);
  return false;

};
