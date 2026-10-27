# Smart Mess & Canteen Management System — Production Setup Guide

This guide describes how to configure, run, and verify the full-stack Smart Mess and Canteen Management System.

---

## 1. System Requirements & Prerequisites

| Technology | Minimum Version | Verified Runtime Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Java Development Kit (JDK)** | OpenJDK 17 | JDK 21.0.9 | Backend Spring Boot compilation & runtime |
| **Apache Maven** | 3.8.x | 3.9.x (embedded wrapper `mvnw.cmd`) | Backend dependency resolution and testing |
| **Node.js & npm** | Node 18+ / npm 9+ | Node 20+ / npm 10+ | Angular client development server & bundle |
| **MySQL Server** | MySQL 8.0+ | MySQL 8.0.44 | Relational database engine |

---

## 2. Database Provisioning & Schema Setup

Ensure MySQL is running on `localhost:3306`. Connect using your MySQL client:

```sql
CREATE DATABASE IF NOT EXISTS smart_mess_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

> **Note on Schema Management:**
> Spring Boot is configured with `spring.jpa.hibernate.ddl-auto=update`. Tables (`admins`, `students`, `messes`, `canteens`, `meals`, `menus`, `food_items`, `food_orders`, `order_items`, `payments`, `subscriptions`, `attendance`, `feedback`, `complaints`, `notices`, `inventory_items`, `stock_movements`, `suppliers`, `system_settings`, `audit_logs`) will automatically synchronize on initial application boot.

---

## 3. Configuration & Environment Variables

All sensitive values in `Backend/smart-mess-management/src/main/resources/application.properties` utilize flexible environment variable fallbacks:

| Variable Name | Default Fallback Value | Description |
| :--- | :--- | :--- |
| `SERVER_PORT` | `8080` | Spring Boot HTTP port |
| `DB_URL` | `jdbc:mysql://localhost:3306/smart_mess_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true` | MySQL JDBC Connection URL |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | `7447Swati@` | Database user password |

To run with custom credentials:
```powershell
$env:DB_USERNAME="custom_user"
$env:DB_PASSWORD="custom_secure_password"
$env:SERVER_PORT="8080"
```

---

## 4. Launching the Backend Service

Navigate to the backend directory and launch via Maven Wrapper:

```powershell
cd 'Backend\smart-mess-management'
.\mvnw.cmd spring-boot:run
```

Once started, the backend will be available at:
`http://localhost:8080`

Health & Initial Verification:
`GET http://localhost:8080/api/settings` returns default business settings auto-seeded on startup.

---

## 5. Launching the Frontend Application

In a separate terminal, navigate to the frontend directory:

```powershell
cd 'Frontend\smart-mess-frontend'
npm install   # If running for the first time
npm start
```

The Angular dev server will compile the standalone architecture and serve at:
`http://localhost:4200`

---

## 6. Default Credentials & Role Matrix

| Portal | Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Portal** (`/login`) | `ADMIN` | `admin@smartmess.com` | `admin123` | Full control over Messes, Canteens, Menus, Food Items, Orders, Payments, Subscriptions, Inventory, Suppliers, Settings & Audit Logs |
| **Student Portal** (`/student-login`) | `STUDENT` | `paliwalswati603@gmail.com` | `123456` | Browse menus, place food orders, cancel pending orders, view order history, purchase subscriptions, check attendance, submit feedback & complaints |
| **Student Portal Registration** (`/student-register`) | `STUDENT` | *User Created* | *User Created* | Any student can register; passwords are automatically encrypted via BCrypt |

---

## 7. Running the Automated Test Suite

The test suite validates password hashing, serialization masking, financial couplings, order state machine, stock movement boundary checks, and attendance duplicate rules:

```powershell
cd 'Backend\smart-mess-management'
.\mvnw.cmd test
```

### Verified Test Suites:
- `SecurityAndAuthTests`: BCrypt encoding, salt verification, Jackson `@JsonProperty(access = WRITE_ONLY)` leak protection.
- `OrderStateMachineTests`: Order lifecycle (`PENDING` -> `CONFIRMED` -> `PREPARING` -> `READY` -> `DELIVERED`), cancellation permission in `PENDING`, illegal state transition blocks.
- `InventoryServiceTests`: Stock purchase increments, consumption decrements, negative stock rejection, low-stock threshold alerting.
- `AttendanceRuleTests`: First-time meal attendance check-in, duplicate attendance rejection with HTTP 409 Conflict.
- `SmartMessManagementApplicationTests`: Spring Boot context loading and database dialect verification.
