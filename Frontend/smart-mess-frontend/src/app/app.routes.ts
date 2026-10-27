import { Routes } from '@angular/router';
import { Home } from './components/components/home/home';
import { Dashboard } from './components/components/dashboard/dashboard';

import { StudentList } from './components/components/student/student-list/student-list';
import { StudentAdd } from './components/components/student/student-add/student-add';
import { StudentEdit } from './components/components/student/student-edit/student-edit';

import { MessList } from './components/components/mess/mess-list/mess-list';
import { MessAdd } from './components/components/mess/mess-add/mess-add';
import { MessEdit } from './components/components/mess/mess-edit/mess-edit';

import { CanteenList } from './components/components/canteen/canteen-list/canteen-list';
import { CanteenAdd } from './components/components/canteen/canteen-add/canteen-add';
import { CanteenEdit } from './components/components/canteen/canteen-edit/canteen-edit';

import { MealList } from './components/components/meal/meal-list/meal-list';
import { MealAdd } from './components/components/meal/meal-add/meal-add';
import { MealEdit } from './components/components/meal/meal-edit/meal-edit';

import { MenuList } from './components/components/menu/menu-list/menu-list';
import { MenuAdd } from './components/components/menu/menu-add/menu-add';
import { MenuEdit } from './components/components/menu/menu-edit/menu-edit';

import { FoodItemList } from './components/components/food-item/food-item-list/food-item-list';
import { FoodItemAdd } from './components/components/food-item/food-item-add/food-item-add';
import { FoodItemEdit } from './components/components/food-item/food-item-edit/food-item-edit';

import { FoodOrderList } from './components/components/food-order/food-order-list/food-order-list';
import { FoodOrderAdd } from './components/components/food-order/food-order-add/food-order-add';

import { PaymentList } from './components/components/payment/payment-list/payment-list';

import { SubscriptionList } from './components/components/subscription/subscription-list/subscription-list';
import { SubscriptionAdd } from './components/components/subscription/subscription-add/subscription-add';

import { AttendanceList } from './components/components/attendance/attendance-list/attendance-list';
import { AttendanceAdd } from './components/components/attendance/attendance-add/attendance-add';

import { FeedbackList } from './components/components/feedback/feedback-list/feedback-list';
import { FeedbackAdd } from './components/components/feedback/feedback-add/feedback-add';

import { ComplaintList } from './components/components/complaint/complaint-list/complaint-list';
import { ComplaintAdd } from './components/components/complaint/complaint-add/complaint-add';

import { NoticeList } from './components/components/notice/notice-list/notice-list';
import { NoticeAdd } from './components/components/notice/notice-add/notice-add';

import { InventoryList } from './components/components/inventory/inventory-list/inventory-list';
import { SupplierList } from './components/components/supplier/supplier-list/supplier-list';
import { SettingsList } from './components/components/settings/settings-list/settings-list';
import { AuditLogList } from './components/components/audit-log/audit-log-list/audit-log-list';

import { authGuard } from './guards/guards/auth-guard';

import { Login } from './components/components/login/login';
import { Register } from './components/components/register/register';

import { StudentLogin } from './components/components/student-login/student-login';
import { StudentRegister } from './components/components/student-register/student-register';
import { StudentDashboard } from './components/components/student-dashboard/student-dashboard';
import { StudentMenu } from './components/components/student-menu/student-menu';
import { StudentOrder } from './components/components/student-order/student-order';
import { StudentOrders } from './components/components/student-orders/student-orders';
import { StudentFeedback } from './components/components/student-feedback/student-feedback';
import { StudentComplaint } from './components/components/student-complaint/student-complaint';
import { StudentNotices } from './components/components/student-notices/student-notices';
import { StudentProfile } from './components/components/student-profile/student-profile';
import { StudentAttendance } from './components/components/student-attendance/student-attendance';
import { StudentSubscription } from './components/components/student-subscription/student-subscription';

export const routes: Routes = [
  // =====================================
  // PUBLIC / HOME
  // =====================================
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },

  // =====================================
  // STUDENT AUTH & PORTAL
  // =====================================
  {
    path: 'student-login',
    component: StudentLogin
  },
  {
    path: 'student-register',
    component: StudentRegister
  },
  {
    path: 'student-dashboard',
    component: StudentDashboard,
    canActivate: [authGuard]
  },
  {
    path: 'student-menu',
    component: StudentMenu,
    canActivate: [authGuard]
  },
  {
    path: 'student-order',
    component: StudentOrder,
    canActivate: [authGuard]
  },
  {
    path: 'student-orders',
    component: StudentOrders,
    canActivate: [authGuard]
  },
  {
    path: 'student-subscription',
    component: StudentSubscription,
    canActivate: [authGuard]
  },
  {
    path: 'student-feedback',
    component: StudentFeedback,
    canActivate: [authGuard]
  },
  {
    path: 'student-complaint',
    component: StudentComplaint,
    canActivate: [authGuard]
  },
  {
    path: 'student-notices',
    component: StudentNotices,
    canActivate: [authGuard]
  },
  {
    path: 'student-profile',
    component: StudentProfile,
    canActivate: [authGuard]
  },
  {
    path: 'student-attendance',
    component: StudentAttendance,
    canActivate: [authGuard]
  },

  // =====================================
  // ADMIN DASHBOARD
  // =====================================
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  // =====================================
  // STUDENTS
  // =====================================
  {
    path: 'students',
    component: StudentList,
    canActivate: [authGuard]
  },
  {
    path: 'students/add',
    component: StudentAdd,
    canActivate: [authGuard]
  },
  {
    path: 'students/edit/:id',
    component: StudentEdit,
    canActivate: [authGuard]
  },

  // =====================================
  // MESSES
  // =====================================
  {
    path: 'messes',
    component: MessList,
    canActivate: [authGuard]
  },
  {
    path: 'messes/add',
    component: MessAdd,
    canActivate: [authGuard]
  },
  {
    path: 'messes/edit/:id',
    component: MessEdit,
    canActivate: [authGuard]
  },

  // =====================================
  // CANTEENS
  // =====================================
  {
    path: 'canteens',
    component: CanteenList,
    canActivate: [authGuard]
  },
  {
    path: 'canteens/add',
    component: CanteenAdd,
    canActivate: [authGuard]
  },
  {
    path: 'canteens/edit/:id',
    component: CanteenEdit,
    canActivate: [authGuard]
  },

  // =====================================
  // MEALS
  // =====================================
  {
    path: 'meals',
    component: MealList,
    canActivate: [authGuard]
  },
  {
    path: 'meals/add',
    component: MealAdd,
    canActivate: [authGuard]
  },
  {
    path: 'meals/edit/:id',
    component: MealEdit,
    canActivate: [authGuard]
  },

  // =====================================
  // MENUS
  // =====================================
  {
    path: 'menus',
    component: MenuList,
    canActivate: [authGuard]
  },
  {
    path: 'menus/add',
    component: MenuAdd,
    canActivate: [authGuard]
  },
  {
    path: 'menus/edit/:id',
    component: MenuEdit,
    canActivate: [authGuard]
  },

  // =====================================
  // FOOD ITEMS
  // =====================================
  {
    path: 'food-items',
    component: FoodItemList,
    canActivate: [authGuard]
  },
  {
    path: 'food-items/add',
    component: FoodItemAdd,
    canActivate: [authGuard]
  },
  {
    path: 'food-items/edit/:id',
    component: FoodItemEdit,
    canActivate: [authGuard]
  },

  // =====================================
  // ORDERS
  // =====================================
  {
    path: 'orders',
    component: FoodOrderList,
    canActivate: [authGuard]
  },
  {
    path: 'orders/add',
    component: FoodOrderAdd,
    canActivate: [authGuard]
  },

  // =====================================
  // PAYMENTS
  // =====================================
  {
    path: 'payments',
    component: PaymentList,
    canActivate: [authGuard]
  },

  // =====================================
  // SUBSCRIPTIONS
  // =====================================
  {
    path: 'subscriptions',
    component: SubscriptionList,
    canActivate: [authGuard]
  },
  {
    path: 'subscriptions/add',
    component: SubscriptionAdd,
    canActivate: [authGuard]
  },

  // =====================================
  // ATTENDANCE
  // =====================================
  {
    path: 'attendance',
    component: AttendanceList,
    canActivate: [authGuard]
  },
  {
    path: 'attendance/add',
    component: AttendanceAdd,
    canActivate: [authGuard]
  },

  // =====================================
  // FEEDBACK
  // =====================================
  {
    path: 'feedbacks',
    component: FeedbackList,
    canActivate: [authGuard]
  },
  {
    path: 'feedbacks/add',
    component: FeedbackAdd,
    canActivate: [authGuard]
  },

  // =====================================
  // COMPLAINTS
  // =====================================
  {
    path: 'complaints',
    component: ComplaintList,
    canActivate: [authGuard]
  },
  {
    path: 'complaints/add',
    component: ComplaintAdd,
    canActivate: [authGuard]
  },

  // =====================================
  // NOTICES
  // =====================================
  {
    path: 'notices',
    component: NoticeList,
    canActivate: [authGuard]
  },
  {
    path: 'notices/add',
    component: NoticeAdd,
    canActivate: [authGuard]
  },

  // =====================================
  // INVENTORY & SUPPLIERS
  // =====================================
  {
    path: 'inventory',
    component: InventoryList,
    canActivate: [authGuard]
  },
  {
    path: 'suppliers',
    component: SupplierList,
    canActivate: [authGuard]
  },

  // =====================================
  // SYSTEM SETTINGS & AUDIT TRAIL
  // =====================================
  {
    path: 'settings',
    component: SettingsList,
    canActivate: [authGuard]
  },
  {
    path: 'audit-logs',
    component: AuditLogList,
    canActivate: [authGuard]
  },

  // Wildcard fallback
  {
    path: '**',
    redirectTo: 'home'
  }
];
