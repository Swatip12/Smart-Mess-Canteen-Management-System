import { Routes } from '@angular/router';

// Home & Dashboard
import { Home } from './components/components/home/home';
import { Dashboard } from './components/components/dashboard/dashboard';

// Student
import { StudentList } from './components/components/student/student-list/student-list';
import { StudentAdd } from './components/components/student/student-add/student-add';
import { StudentEdit } from './components/components/student/student-edit/student-edit';

// Mess
import { MessList } from './components/components/mess/mess-list/mess-list';
import { MessAdd } from './components/components/mess/mess-add/mess-add';
import { MessEdit } from './components/components/mess/mess-edit/mess-edit';

// Canteen
import { CanteenList } from './components/components/canteen/canteen-list/canteen-list';
import { CanteenAdd } from './components/components/canteen/canteen-add/canteen-add';
import { CanteenEdit } from './components/components/canteen/canteen-edit/canteen-edit';

// Menu
import { MenuList } from './components/components/menu/menu-list/menu-list';
import { MenuAdd } from './components/components/menu/menu-add/menu-add';
import { MenuEdit } from './components/components/menu/menu-edit/menu-edit';

// Food Item
import { FoodItemList } from './components/components/food-item/food-item-list/food-item-list';
import { FoodItemAdd } from './components/components/food-item/food-item-add/food-item-add';
import { FoodItemEdit } from './components/components/food-item/food-item-edit/food-item-edit';

// Food Order
import { FoodOrderList } from './components/components/food-order/food-order-list/food-order-list';
import { FoodOrderAdd } from './components/components/food-order/food-order-add/food-order-add';

// Payment
import { PaymentList } from './components/components/payment/payment-list/payment-list';

// Subscription
import { SubscriptionList } from './components/components/subscription/subscription-list/subscription-list';
import { SubscriptionAdd } from './components/components/subscription/subscription-add/subscription-add';

// Attendance
import { AttendanceList } from './components/components/attendance/attendance-list/attendance-list';
import { AttendanceAdd } from './components/components/attendance/attendance-add/attendance-add';

// Feedback
import { FeedbackList } from './components/components/feedback/feedback-list/feedback-list';
import { FeedbackAdd } from './components/components/feedback/feedback-add/feedback-add';

// Complaint
import { ComplaintList } from './components/components/complaint/complaint-list/complaint-list';
import { ComplaintAdd } from './components/components/complaint/complaint-add/complaint-add';

// Notice
import { NoticeList } from './components/components/notice/notice-list/notice-list';
import { NoticeAdd } from './components/components/notice/notice-add/notice-add';

// Login & Register
import { Login } from './components/components/login/login';
import { Register } from './components/components/register/register';

// Auth Guard
import { authGuard } from './guards/guards/auth-guard';


export const routes: Routes = [

  // =====================================================
  // DEFAULT
  // =====================================================

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


  // =====================================================
  // HOME
  // =====================================================

  {
    path: 'home',
    component: Home
  },


  // =====================================================
  // LOGIN
  // =====================================================

  {
    path: 'login',
    component: Login
  },


  // =====================================================
  // REGISTER
  // =====================================================

  {
    path: 'register',
    component: Register
  },


  // =====================================================
  // DASHBOARD
  // =====================================================

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },


  // =====================================================
  // STUDENTS
  // =====================================================

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


  // =====================================================
  // MESSES
  // =====================================================

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


  // =====================================================
  // CANTEENS
  // =====================================================

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


  // =====================================================
  // MENUS
  // =====================================================

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


  // =====================================================
  // FOOD ITEMS
  // =====================================================

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


  // =====================================================
  // FOOD ORDERS
  // =====================================================

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


  // =====================================================
  // PAYMENTS
  // =====================================================

  {
    path: 'payments',
    component: PaymentList,
    canActivate: [authGuard]
  },


  // =====================================================
  // SUBSCRIPTIONS
  // =====================================================

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


  // =====================================================
  // ATTENDANCE
  // =====================================================

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


  // =====================================================
  // FEEDBACK
  // =====================================================

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


  // =====================================================
  // COMPLAINTS
  // =====================================================

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


  // =====================================================
  // NOTICES
  // =====================================================

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


  // =====================================================
  // INVALID URL
  // =====================================================

  {
    path: '**',
    redirectTo: 'home'
  }

];