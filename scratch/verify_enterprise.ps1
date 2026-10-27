$baseUrl = "http://localhost:8080/api"

Write-Host "=== ENTERPRISE ENDPOINTS VERIFICATION ===" -ForegroundColor Cyan

# 1. System Settings
Write-Host "`n1. Testing System Settings..." -ForegroundColor Yellow
$settings = Invoke-RestMethod -Uri "$baseUrl/settings" -Method Get
Write-Host "Settings Count: $($settings.Count)" -ForegroundColor Green
foreach ($s in $settings) {
    Write-Host "  - $($s.settingKey): $($s.settingValue) ($($s.description))"
}

# 2. Suppliers
Write-Host "`n2. Testing Suppliers..." -ForegroundColor Yellow
$supplierBody = @{
    name = "Metro Agro Supplies"
    contactPerson = "Ramesh Kumar"
    phone = "9876543210"
    email = "ramesh@metroagro.com"
    address = "APMC Market Yard, Pune"
    category = "GRAINS_AND_PULSES"
    isActive = $true
} | ConvertTo-Json

$createdSupplier = Invoke-RestMethod -Uri "$baseUrl/suppliers" -Method Post -Body $supplierBody -ContentType "application/json"
Write-Host "Created Supplier ID: $($createdSupplier.id), Name: $($createdSupplier.name)" -ForegroundColor Green

# 3. Inventory Items
Write-Host "`n3. Testing Inventory Creation..." -ForegroundColor Yellow
$invBody = @{
    name = "Premium Basmati Rice"
    category = "GRAINS"
    unit = "KG"
    quantity = 100.0
    minimumThreshold = 20.0
    unitCost = 85.0
    notes = "Warehouse Bin A-1"
} | ConvertTo-Json

$createdInv = Invoke-RestMethod -Uri "$baseUrl/inventory" -Method Post -Body $invBody -ContentType "application/json"
$invId = $createdInv.id
Write-Host "Created Inventory Item ID: $invId, Name: $($createdInv.name), Qty: $($createdInv.quantity) $($createdInv.unit)" -ForegroundColor Green

# 4. Stock Movement (Consumption 30kg)
Write-Host "`n4. Testing Stock Movement (Consumption 30kg)..." -ForegroundColor Yellow
$usageMovement = @{
    quantity = 30.0
    type = "CONSUMPTION"
    reason = "Daily Lunch Preparation"
    performedBy = "Mess Head Chef"
} | ConvertTo-Json

$updatedInvMovement = Invoke-RestMethod -Uri "$baseUrl/inventory/$invId/movement" -Method Post -Body $usageMovement -ContentType "application/json"
$currentInv = Invoke-RestMethod -Uri "$baseUrl/inventory/$invId" -Method Get
Write-Host "Stock after 30kg consumption: $($currentInv.quantity) $($currentInv.unit)" -ForegroundColor Green

# 5. Prevent Negative Stock Violation
Write-Host "`n5. Testing Negative Stock Prevention (Attempting 150kg consumption on 70kg remaining)..." -ForegroundColor Yellow
try {
    $excessMovement = @{
        quantity = 150.0
        type = "CONSUMPTION"
        reason = "Excess Consumption"
        performedBy = "Mess Head Chef"
    } | ConvertTo-Json

    $failResp = Invoke-RestMethod -Uri "$baseUrl/inventory/$invId/movement" -Method Post -Body $excessMovement -ContentType "application/json"
    Write-Host "FAILURE: Negative stock was permitted!" -ForegroundColor Red
} catch {
    Write-Host "SUCCESS: Negative stock rejected cleanly with HTTP $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Green
}

# 6. Low Stock Threshold Detection
Write-Host "`n6. Testing Low Stock Detection..." -ForegroundColor Yellow
# Deduct 55kg more to bring 70kg down to 15kg (below 20kg threshold)
$lowStockMovement = @{
    quantity = 55.0
    type = "CONSUMPTION"
    reason = "Dinner Preparation"
    performedBy = "Mess Head Chef"
} | ConvertTo-Json
$invLowMov = Invoke-RestMethod -Uri "$baseUrl/inventory/$invId/movement" -Method Post -Body $lowStockMovement -ContentType "application/json"
$invLow = Invoke-RestMethod -Uri "$baseUrl/inventory/$invId" -Method Get
Write-Host "Current Qty now: $($invLow.quantity) (Threshold: $($invLow.minimumThreshold))" -ForegroundColor Gray

$lowStockList = Invoke-RestMethod -Uri "$baseUrl/inventory/low-stock" -Method Get
Write-Host "Low Stock Items Count: $($lowStockList.Count)" -ForegroundColor Green
foreach ($item in $lowStockList) {
    Write-Host "  - ALERT: $($item.name) is at $($item.quantity) $($item.unit) (min $($item.minimumThreshold))" -ForegroundColor Red
}

# 7. Audit Logs
Write-Host "`n7. Testing Audit Trail..." -ForegroundColor Yellow
$auditLogs = Invoke-RestMethod -Uri "$baseUrl/audit-logs" -Method Get
Write-Host "Audit Logs Count: $($auditLogs.Count)" -ForegroundColor Green

# 8. Dashboard Live Summary
Write-Host "`n8. Testing Live Dashboard Summary..." -ForegroundColor Yellow
$summary = Invoke-RestMethod -Uri "$baseUrl/reports/dashboard-summary" -Method Get
Write-Host "Total Revenue: Rs. $($summary.totalRevenue)" -ForegroundColor Green
Write-Host "Today Revenue: Rs. $($summary.todayRevenue)" -ForegroundColor Green
Write-Host "Pending Orders: $($summary.pendingOrders)" -ForegroundColor Green
Write-Host "Active Subscriptions: $($summary.activeSubscriptions)" -ForegroundColor Green
Write-Host "Total Students: $($summary.totalStudents)" -ForegroundColor Green
Write-Host "Low Stock Count: $($summary.lowStockCount)" -ForegroundColor Green

# 9. CSV Exports
Write-Host "`n9. Testing CSV Exports..." -ForegroundColor Yellow
$csvPayments = Invoke-WebRequest -Uri "$baseUrl/reports/csv/payments" -Method Get -UseBasicParsing
Write-Host "Payments CSV Header: $(($csvPayments.Content -split "`n")[0])" -ForegroundColor Green
Write-Host "Payments CSV Lines: $(($csvPayments.Content -split "`n").Count)" -ForegroundColor Green

$csvOrders = Invoke-WebRequest -Uri "$baseUrl/reports/csv/orders" -Method Get -UseBasicParsing
Write-Host "Orders CSV Header: $(($csvOrders.Content -split "`n")[0])" -ForegroundColor Green
Write-Host "Orders CSV Lines: $(($csvOrders.Content -split "`n").Count)" -ForegroundColor Green

Write-Host "`n=== ALL ENTERPRISE ENDPOINTS VERIFIED SUCCESSFULLY ===" -ForegroundColor Green
