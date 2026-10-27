# 🍴 Smart Mess & Canteen Management System

A full-stack, enterprise-grade web application built to streamline hostel dining halls, campus messes, and cafeteria operations. The platform offers dedicated portals for **Mess Administrators** and **Hostel Students** to manage meal subscriptions, canteen ordering, QR/menu scheduling, digital payments, attendance check-ins, and grievance resolutions.

---

## 🚀 Technology Stack

- **Backend:** Java 21, Spring Boot, Spring Data JPA, Hibernate ORM, Maven
- **Database:** MySQL 8.0 (`smart_mess_db`)
- **Frontend:** Angular 21, TypeScript, Bootstrap 5.3.3, Bootstrap Icons
- **Security & Session:** Role-Based Access Control (RBAC), Route Guards, SHA/BCrypt hashing support

---

## 🌟 Key Features

### 🏢 1. Admin Portal (`http://localhost:4200/login`)
- **Executive Dashboard:** Live metrics for total students, messes, canteens, and published notices with quick operational shortcuts.
- **Student Management:** Full student CRUD, roll numbers, hostel room assignments, live search, and account status toggles.
- **Mess & Canteen Facilities:** Manage dining halls, locations, seating capacity, dietary types (VEG, NON-VEG, BOTH), opening hours, and active statuses.
- **Meal Timings & Daily Menus:** Configure breakfast, lunch, high tea, and dinner windows; publish day-by-day dish schedules.
- **Canteen Inventory & Orders:** Real-time dish pricing, inventory availability toggles, order status tracking (PENDING ➔ CONFIRMED ➔ READY ➔ DELIVERED).
- **Subscriptions & Billing:** Track student monthly, quarterly, and yearly meal memberships.
- **Attendance Logging:** Daily check-in tracking with date-range filtering.
- **Complaints & Feedback:** Review student grievances with inline resolution notes; inspect rating stars and food quality reviews.
- **Circulars & Notices:** Broadcast announcements, holiday timings, and urgent maintenance alerts.

### 🎓 2. Student Portal (`http://localhost:4200/student-login`)
- **Student Dashboard:** Quick cards to view menus, order food, check attendance, renew subscriptions, and file complaints.
- **Today's Menu:** Filter by mess facility and date to view published breakfast, lunch, and dinner dishes.
- **Food Ordering:** Interactive canteen menu with cart management, real-time total calculation, and order tracking.
- **Order History:** Full history of past canteen orders with live fulfillment status pills.
- **Meal Subscriptions:** View active plan duration, validity dates, amount, and self-serve plan renewal (Monthly, Quarterly, Yearly).
- **Attendance History:** Monitor meal check-in count, attendance percentage rate, and missed meals.
- **File Complaints & Feedback:** Submit feedback with 1-5 star ratings and file categorized grievance tickets.
- **Campus Notices:** Real-time announcements and emergency notifications feed.
- **Student Profile:** Update contact details, hostel room numbers, and personal info.

---

## 🔑 Default Credentials

### Administrator
- **Email:** `admin@smartmess.com`
- **Password:** `admin123`
- **Portal URL:** [http://localhost:4200/login](http://localhost:4200/login)

### Student Account (Sample Seeded)
- **Email:** `paliwalswati603@gmail.com`
- **Password:** `123456`
- **Portal URL:** [http://localhost:4200/student-login](http://localhost:4200/student-login)

*(New Admin or Student accounts can also be registered at any time via the registration pages)*

---

## ⚡ Quick Start Guide

### Option A: One-Click Startup (Recommended for Windows)
Double-click `run-all.bat` in the project root folder.
This will automatically launch:
1. Spring Boot Backend on `http://localhost:8080`
2. Angular Frontend on `http://localhost:4200`

### Option B: Manual Startup

#### 1. Start MySQL
Ensure MySQL service is running on `localhost:3306` with database `smart_mess_db`.
Credentials in `Backend/smart-mess-management/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_mess_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
```

#### 2. Run Backend
```cmd
cd Backend\smart-mess-management
mvn spring-boot:run
```
*(Backend runs on `http://localhost:8080`)*

#### 3. Run Frontend
```cmd
cd Frontend\smart-mess-frontend
npm start
```
*(Frontend runs on `http://localhost:4200`)*

---

## 📡 REST API Summary

| Module | Method | Endpoint | Description |
|---|---|---|---|
| **Admin** | POST | `/api/admins/login` | Administrator authentication |
| **Student** | POST | `/api/students/login` | Student authentication |
| **Students** | GET, POST, PUT, DELETE | `/api/students` | Student CRUD |
| **Messes** | GET, POST, PUT, DELETE | `/api/messes` | Mess facilities management |
| **Canteens** | GET, POST, PUT, DELETE | `/api/canteens` | Canteen outlets & cafeteria |
| **Meals** | GET, POST, PUT, DELETE | `/api/meals` | Breakfast/Lunch/Dinner sessions |
| **Menus** | GET, POST, PUT, DELETE | `/api/menus` | Daily menu schedules |
| **Food Items**| GET, POST, PUT, DELETE | `/api/food-items` | Canteen food menu & pricing |
| **Orders** | GET, POST | `/api/orders` | Place & retrieve canteen orders |
| **Orders** | GET | `/api/orders/student/{id}`| Orders by student ID |
| **Orders** | PUT | `/api/orders/{id}/status` | Update fulfillment status |
| **Subscriptions** | GET, POST, DELETE | `/api/subscriptions` | Student dining memberships |
| **Attendance** | GET, POST | `/api/attendance` | Check-in attendance records |
| **Feedback** | GET, POST | `/api/feedbacks` | Ratings and reviews |
| **Complaints** | GET, POST, PUT | `/api/complaints` | Grievances & resolution |
| **Notices** | GET, POST, PUT | `/api/notices` | Campus dining announcements |
| **Payments** | GET, POST | `/api/payments` | Financial audits & receipts |
