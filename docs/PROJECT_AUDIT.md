# 🔍 Smart Mess & Canteen Management System — Comprehensive Project Audit

**Document Version:** 1.0.0  
**Date:** October 26, 2026  
**Auditor:** Senior Full-Stack Software Architect & QA Lead  
**Branch:** `Ashwini-branch`  
**Repository State:** Local modifications active, both servers verified live on localhost.

---

## 1. Executive Summary

This audit assesses the architecture, code quality, security posture, database design, user experience, and feature completeness of the **Smart Mess & Canteen Management System**.

The application currently possesses an operational foundation with working CRUD capabilities for core entities, basic role segmentation (Admin vs. Student), and reactive forms across both portals. However, transitioning the codebase into a production-grade, enterprise-ready system requires addressing major structural gaps in authentication/authorization, financial reconciliation, order state integrity, attendance enforcement, inventory management, audit logging, reporting, and automated testing.

---

## 2. Actual Technology Stack & Runtime Environment

| Layer | Component / Tool | Version / Spec | Notes |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | Spring Boot | `4.1.1` (parent POM) | Embedded Apache Tomcat `11.0.24` |
| **Java Platform** | JDK / JRE | Java `21.0.8` (configured `17` in pom) | Runs on 64-bit Windows JVM |
| **Persistence / ORM** | Spring Data JPA / Hibernate | Hibernate ORM `7.4.5.Final`, Jakarta Persistence `3.2.0` | Uses HikariCP pool |
| **Database** | MySQL Server | `8.0.44` on `localhost:3306` | Schema: `smart_mess_db` |
| **Frontend Framework** | Angular | `21.2.0` (Core, Common, Router, Forms) | Standalone components architecture |
| **Frontend Tooling** | Angular CLI / Build | `21.2.19` (Vite/Esbuild pipeline) | Fast HMR & differential bundling |
| **Styling & Icons** | Bootstrap & Bootstrap Icons | Bootstrap `5.3.3`, BI `1.11.3` | Custom design system in `styles.css` |
| **Testing Backend** | JUnit 5 & Spring Boot Test | `spring-boot-starter-test` | 1 single default contextLoads test |
| **Testing Frontend** | Vitest & JSDOM | Vitest `^4.0.8`, JSDOM `^28.0.0` | Unit specs present for modules |

---

## 3. Git Status & Source Tree Inspection

- **Active Branch:** `Ashwini-branch` (diverged from `origin/Ashwini-branch` by 5 local and 1 remote commit).
- **Merge State:** `Backend/.../serviceimpl/StudentServiceImpl.java` was recorded in an unmerged state (`both modified`), though conflict markers were cleanly resolved in the local working copy.
- **Local Modifications:**
  - 15 Controller classes updated with CRUD/lookup endpoints.
  - 15 JPA Entity classes updated with transient ID fields and bidirectional reference handling (`@JsonManagedReference`, `@JsonBackReference`).
  - 15 Service implementations updated with defensive foreign key resolution.
  - 5 Repository interfaces updated with explicit `@Query` JPQL methods to avoid SQM path resolution errors.
  - CORS configuration globally enabled for cross-origin Angular dev server integration.
  - 10+ Student portal components and views created in Frontend.
  - Operational scripts created: `run-all.bat`, `run-backend.bat`, `run-frontend.bat`.
- **Constraint Adherence:** No commits, checkouts, or destructive resets have been or will be executed without explicit user permission.

---

## 4. Current Architecture & Data Flow

```
[ Browser / Angular Frontend ]
       │  (HTTP / JSON via port 4200)
       ▼
[ Spring Boot REST Controllers ] (/api/* on port 8080)
       │
[ Service Layer & Business Logic ] (*Service & *ServiceImpl)
       │
[ Spring Data JPA Repositories ] (*Repository via JPQL/Derived Queries)
       │
[ Hibernate ORM 7.x & HikariCP ]
       │
[ MySQL 8.0 Database (smart_mess_db) ] (15 Tables)
```

### Trace of Key Existing Workflows:
1. **Admin / Student Login:**
   - Client sends credentials `{ email, password }` via `POST /api/admins/login` or `POST /api/students/login`.
   - Controller queries `findByEmail(email)`, compares plaintext passwords in memory via `.filter(user -> user.getPassword().equals(password))`, and returns profile attributes with `adminId` or `studentId`.
   - Frontend stores ID and role in browser `localStorage`.
2. **Canteen Ordering:**
   - Student selects canteen dishes, adds to cart, and submits `POST /api/orders`.
   - Backend persists `FoodOrder` and nested `FoodOrderItem` records with status `PENDING`.
   - Admin views orders on `/orders` and updates status via `PUT /api/orders/{id}/status?status=...`.
3. **Mess Subscription:**
   - Student selects mess and plan duration (`MONTHLY`, `QUARTERLY`, `YEARLY`) on `/student-subscription`.
   - Backend calculates dates and persists `Subscription` with `ACTIVE` status.
4. **Attendance Logging:**
   - Admin logs attendance via `POST /api/attendance` with `studentId`, `mealId`, and `attendanceDate`.

---

## 5. Critical Vulnerabilities & High-Priority Technical Debt

### 🔴 Security & Authentication Vulnerabilities
1. **Plaintext Password Storage & Comparison:**
   - Passwords for both `Admin` and `Student` are stored unhashed in MySQL.
   - Comparison uses raw string equality (`.equals(password)`).
   - No BCrypt/Argon2 password hashing is configured.
2. **Sensitive Credential Exposure in REST APIs:**
   - `GET /api/students`, `GET /api/students/{id}`, and `GET /api/admins` return full entity JSON containing the `password` field in plain text over the wire.
3. **Zero Backend Route Authorization:**
   - Spring Security is not active in the project. Any unauthenticated caller who knows the port and route can trigger `DELETE /api/students/{id}`, `DELETE /api/messes/{id}`, or update financial records via cURL/Postman.
   - Frontend Route Guards rely entirely on easily forged client-side `localStorage` keys (`adminId`, `userRole`).
4. **Hardcoded Database Secrets:**
   - `spring.datasource.password=7447Swati@` is stored in plaintext in `application.properties`. No environment variable fallback (`${DB_PASSWORD:...}`) is used.

### 🟡 Business Logic & Data Integrity Issues
1. **Decoupled Payments & Financial Transactions:**
   - Placing a canteen order or activating a mess subscription **does not create a corresponding Payment record**.
   - No payment status tracking, transaction reference generation, or reconciliation exists between orders and ledger entries.
2. **Missing Inventory Module:**
   - No stock management, raw material tracking, consumption calculation, or ingredient deductions exist.
   - An item marked `isAvailable = true` can be ordered infinitely regardless of kitchen stock.
3. **Attendance Duplicate Check-in & Eligibility Bypasses:**
   - The backend `AttendanceServiceImpl` does not verify if a student has an `ACTIVE` subscription before marking them present.
   - No unique constraint exists on `(student_id, meal_id, attendance_date)`, allowing duplicate check-in entries for the same meal on the same day.
4. **Unenforced Order State Machine:**
   - Order statuses can be transitioned arbitrarily (e.g. from `CANCELLED` directly to `DELIVERED`).
   - The `PREPARING` state is missing from `OrderStatus` enum.
   - Students have no rule-bound cancellation capability.
5. **No Audit Trail:**
   - Critical events (price changes, menu edits, manual payments, order cancellations, admin credential modifications) leave no audit log in the database.

### 🔵 Architecture & Code Hygiene
1. **Lack of DTO Abstraction:**
   - REST Controllers bind directly to JPA Entities, risking mass-assignment exploits and causing circular serialization risks if relationships expand.
2. **Client-Side Heavy Dashboard Analytics:**
   - The Admin dashboard fetches complete tables (`getAll()`) into client memory to compute simple metrics like total student counts and pending order counts, which will cause browser performance degradation under production data volumes.
3. **No Structured Error Responses:**
   - Generic runtime exceptions (`RuntimeException`) return Spring Boot default error pages that can leak class names and internal traces.

---

## 6. Detailed Module Gap Analysis (Phase 2 Alignment)

| Module | Intern Plan Baseline | Current Implementation Status | Gap to Reach Production Standard |
| :--- | :--- | :--- | :--- |
| **A. Auth & RBAC** | Basic login | Plaintext login; localStorage state | BCrypt hashing, JWT tokens, Spring Security filter, role hierarchy (`SUPER_ADMIN`, `MESS_ADMIN`, `CANTEEN_STAFF`, `STUDENT`) |
| **B. Dashboard** | Card counts | Memory counts in Angular | Server-side aggregation queries (`COUNT`, `SUM`), revenue graphs, date filtering, low-stock warnings |
| **C. Menu Mgmt** | Basic daily menu | Date/meal slot with flat string items | Recurring weekly schedules, nutritional tags, dietary badges, item availability toggles |
| **D. Student Mgmt** | Student CRUD | Basic profile and room number | Dietary preferences (Veg/Non-Veg/Jain), balance tracking, employee/guest identification |
| **E & F. Ordering** | Order placement | Order creation and admin status toggle | Structured order IDs (`ORD-YYYYMMDD-XXXX`), `PREPARING` state, cancellation rules, status history |
| **G. Payments** | Payment list view | Decoupled payment table; manual entries | Auto-generate payment on order/subscription, test mode & cash payment, idempotency keys, receipt lookup |
| **H. Inventory** | Not implemented | **Missing** | Inventory items, stock levels, minimum thresholds, stock movements (PURCHASE, USAGE, WASTAGE), low-stock alerts |
| **I. Subscriptions & Attendance** | Basic subscription & attendance | Functional CRUD | Duplicate check-in prevention, subscription active validity gate, QR check-in readiness |
| **J. Suppliers** | Not implemented | **Missing** | Supplier directory, purchase orders, delivery status tracking |
| **K. Reports** | Not implemented | **Missing** | Daily/monthly revenue reports, popular dishes, CSV export |
| **L. Notifications** | Notice board only | Global notices working | Targeted student notifications, low-stock alerts, order ready alerts |
| **M. Audit Trail** | Not implemented | **Missing** | Event log table recording actor, action, timestamp, entity affected, and old/new values |
| **N. Settings** | Not implemented | **Missing** | Mess opening hours, tax/GST percentage, order cancellation window, system parameters |

---

## 7. Current Startup & Runtime Status

- **MySQL Database (port 3306):** Running, verified healthy, 15 tables populated.
- **Spring Boot Backend (port 8080):** Running, verified healthy, all 15 controllers responding with HTTP 200/201.
- **Angular Frontend (port 4200):** Running, verified healthy, 0 compiler errors, 0 compiler warnings.
- **Port Conflict Fixes:** Implemented in `run-backend.bat` and `run-frontend.bat`.

---

## 8. Summary of Findings

The existing application is stable at its foundational layer: services, entities, and controllers communicate without crashes, and the Angular UI renders all views seamlessly. To elevate this project to an enterprise-grade portfolio standard, the core priorities must focus on **Security (BCrypt + JWT/Session authorization)**, **Data Consistency (Order-Payment coupling, Attendance uniqueness)**, **Missing Business Capabilities (Inventory, Audit Trail, Reporting)**, and **Production Engineering (DTOs, Global Exception Handling, Environment Config)**.
