# Smart Mess & Canteen Management System — REST API Documentation

Base URL: `http://localhost:8080/api`  
Content-Type: `application/json`  
CORS Enabled: `http://localhost:4200`

---

## 1. Authentication & Security Endpoints

### 1.1 Admin Authentication
- **POST** `/admins/login`
  - Request: `{"email": "admin@smartmess.com", "password": "admin123"}`
  - Response (200): `{"id": 1, "name": "Admin User", "email": "admin@smartmess.com", "role": "ADMIN", ...}` *(Password omitted)*

### 1.2 Student Authentication & Registration
- **POST** `/students/login`
  - Request: `{"email": "student@example.com", "password": "securePassword"}`
  - Response (200): `{"id": 1, "name": "Student Name", "email": "student@example.com", ...}` *(Password omitted)*
- **POST** `/students/register`
  - Request: `{"name": "...", "email": "...", "password": "...", "phone": "...", "rollNumber": "...", "department": "...", "hostelName": "...", "roomNumber": "..."}`
  - Response (201): Student details with BCrypt-hashed password stored internally.

---

## 2. Operations: Food Orders & State Machine

### 2.1 Order Lifecycle Endpoints
- **GET** `/orders`: List all orders across all canteens.
- **GET** `/orders/{id}`: Get single order details with itemized items.
- **GET** `/orders/student/{studentId}`: Get order history for a specific student.
- **GET** `/orders/status/{status}`: Filter orders by status (`PENDING`, `CONFIRMED`, `PREPARING`, `READY`, `DELIVERED`, `CANCELLED`).
- **POST** `/orders`: Create new order.
  - Automatically computes item subtotals and total amount.
  - Generates auto-coupled `Payment` record with type `CANTEEN_ORDER`, reference `TXN-ORD-...`, status `COMPLETED`.
- **PUT** `/orders/{id}/status?status={NEW_STATUS}`: Transition order status.
  - Enforces finite state machine:
    - `PENDING` -> `CONFIRMED` / `PREPARING` / `CANCELLED`
    - `CONFIRMED` -> `PREPARING` / `READY` / `CANCELLED`
    - `PREPARING` -> `READY`
    - `READY` -> `DELIVERED`
    - Terminal states `DELIVERED` and `CANCELLED` cannot be mutated (throws 400 Bad Request).
- **PUT** `/orders/{id}/cancel?studentId={studentId}`: Cancel pending order.
  - Verifies student ownership and verifies status is strictly `PENDING` (returns 409 Conflict if preparing or later).

---

## 3. Financials: Payments & Subscriptions

### 3.1 Payments
- **GET** `/payments`: List all payment transaction records.
- **GET** `/payments/{id}`: Single payment transaction.
- **GET** `/payments/student/{studentId}`: Student payment ledger.
- **POST** `/payments`: Record manual or gateway payment transaction.

### 3.2 Subscriptions
- **GET** `/subscriptions`: List all mess subscription memberships.
- **GET** `/subscriptions/student/{studentId}`: Student subscription history.
- **POST** `/subscriptions`: Purchase new mess subscription.
  - Auto-couples financial transaction: Creates `Payment` record with type `SUBSCRIPTION`, reference `TXN-SUB-...`, status `COMPLETED`.
  - Marks subscription status `ACTIVE`.
- **GET** `/subscriptions/active?studentId={id}&messId={id}`: Returns boolean indicating whether student has an active subscription to a given mess.

---

## 4. Mess Attendance & Meal Check-in

- **GET** `/attendance`: List all attendance records.
- **GET** `/attendance/student/{studentId}`: Attendance history for student.
- **POST** `/attendance`: Record meal check-in.
  - Request: `{"studentId": 1, "mealId": 2, "attendanceDate": "2026-10-27"}`
  - **Duplicate Check-in Prevention**: Rejects duplicate attendance for the same student, meal, and date with `409 Conflict` (`IllegalStateException`).

---

## 5. Enterprise Kitchen Inventory & Movements

### 5.1 Inventory Items
- **GET** `/inventory`: List all inventory stock items with category, quantity, unit, threshold, and low-stock flag.
- **GET** `/inventory/{id}`: Get single inventory item.
- **POST** `/inventory`: Add new kitchen stock item.
  - Request: `{"name": "Basmati Rice", "category": "GRAINS", "quantity": 100.0, "unit": "KG", "minimumThreshold": 20.0, "unitCost": 85.0}`
- **PUT** `/inventory/{id}`: Update inventory metadata or thresholds.
- **DELETE** `/inventory/{id}`: Remove inventory item.
- **GET** `/inventory/low-stock`: Returns only ingredients whose `quantity <= minimumThreshold`.

### 5.2 Stock Movements
- **POST** `/inventory/{id}/movement`: Record movement (`PURCHASE`, `CONSUMPTION`, `WASTAGE`, `ADJUSTMENT`).
  - Request: `{"quantity": 30.0, "type": "CONSUMPTION", "reason": "Lunch preparation", "performedBy": "Chef"}`
  - **Negative Stock Prevention**: Throws `400 Bad Request` if requested consumption/wastage quantity exceeds available stock.
- **GET** `/inventory/{id}/movements`: Returns ledger of all past restocks, usages, and wastage for this item.

---

## 6. Suppliers & Vendors

- **GET** `/suppliers`: List all active ingredient and equipment suppliers.
- **GET** `/suppliers/{id}`: Get single supplier profile.
- **POST** `/suppliers`: Register new vendor.
  - Request: `{"name": "Metro Agro", "contactPerson": "Ramesh", "phone": "...", "email": "...", "address": "...", "category": "GRAINS_AND_PULSES", "isActive": true}`
- **PUT** `/suppliers/{id}`: Update supplier contact details.
- **DELETE** `/suppliers/{id}`: Deactivate supplier.

---

## 7. Business Settings & Audit Trail

### 7.1 System Settings
- **GET** `/settings`: List all active operational parameters.
- **GET** `/settings/{key}`: Retrieve value of specific setting key.
- **POST** `/settings`: Create or update business rule parameter.
  - Pre-seeded default parameters:
    - `ORDER_CANCELLATION_MINUTES`: Order cancellation time window (Default: 15 min).
    - `TAX_PERCENTAGE`: Applicable GST/VAT rate (Default: 5.0%).
    - `MESS_LATE_FEE`: Late payment fee on overdue subscriptions (Default: Rs. 100).
    - `GUEST_MEAL_RATE`: Charge per walk-in/guest meal (Default: Rs. 90).
    - `MESS_FEEDBACK_MANDATORY`: Feedback requirement before renewal (Default: false).

### 7.2 Audit Trail
- **GET** `/audit-logs`: Chronological audit log of administrative actions, stock movements, and financial status changes.
- **GET** `/audit-logs/entity/{entityName}/{entityId}`: History for specific entity record.

---

## 8. Reports & Data Exports

### 8.1 Live Dashboard Summary
- **GET** `/reports/dashboard-summary`
  - Response (200):
  ```json
  {
    "totalRevenue": 6285.00,
    "todayRevenue": 3285.00,
    "totalStudents": 2,
    "activeSubscriptions": 2,
    "pendingOrders": 1,
    "openComplaints": 0,
    "lowStockCount": 2
  }
  ```

### 8.2 Streaming CSV Exports
- **GET** `/reports/csv/payments`: Streams CSV format of all transactions (`Payment ID, Transaction ID, Student ID, Student Name, Type, Amount, Status, Payment Method, Paid At`).
- **GET** `/reports/csv/orders`: Streams CSV format of all canteen orders (`Order ID, Student ID, Student Name, Canteen Name, Total Amount, Status, Ordered At`).
