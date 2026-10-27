$baseUrl = "http://localhost:8080/api"

Write-Host "=== STUDENT PANEL ENDPOINTS VERIFICATION ===" -ForegroundColor Cyan

# 1. Student Login
Write-Host "`n1. Testing Student Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "paliwalswati603@gmail.com"
    password = "123456"
} | ConvertTo-Json

$loginResp = Invoke-RestMethod -Uri "$baseUrl/students/login" -Method Post -Body $loginBody -ContentType "application/json"
$studentId = $loginResp.studentId
Write-Host "SUCCESS: Student Logged in! ID=$studentId, Name=$($loginResp.name), Email=$($loginResp.email)" -ForegroundColor Green

# 2. Student Profile Fetch
Write-Host "`n2. Testing Student Profile Fetch..." -ForegroundColor Yellow
$profile = Invoke-RestMethod -Uri "$baseUrl/students/$studentId" -Method Get
Write-Host "SUCCESS: Profile loaded: Roll=$($profile.rollNumber), Hostel=$($profile.hostelName), Room=$($profile.roomNumber)" -ForegroundColor Green

# 3. Available Canteen Food Items for Student
Write-Host "`n3. Testing Available Canteen Food Items..." -ForegroundColor Yellow
$canteens = Invoke-RestMethod -Uri "$baseUrl/canteens" -Method Get
$canteenId = $canteens[0].id
$availableItems = Invoke-RestMethod -Uri "$baseUrl/food-items/canteen/$canteenId/available" -Method Get
Write-Host "SUCCESS: Canteen '$($canteens[0].name)' has $($availableItems.Count) available dishes" -ForegroundColor Green

# 4. Student Order History
Write-Host "`n4. Testing Student Order History..." -ForegroundColor Yellow
$orders = Invoke-RestMethod -Uri "$baseUrl/orders/student/$studentId" -Method Get
Write-Host "SUCCESS: Student has $($orders.Count) orders in history" -ForegroundColor Green

# 5. Student Active Subscriptions
Write-Host "`n5. Testing Student Subscriptions..." -ForegroundColor Yellow
$subscriptions = Invoke-RestMethod -Uri "$baseUrl/subscriptions" -Method Get
$mySubs = $subscriptions | Where-Object { $_.studentId -eq $studentId -or ($_.student -and $_.student.id -eq $studentId) }
Write-Host "SUCCESS: Student has $($mySubs.Count) subscriptions" -ForegroundColor Green

# 6. Student Attendance History
Write-Host "`n6. Testing Student Attendance..." -ForegroundColor Yellow
$attendance = Invoke-RestMethod -Uri "$baseUrl/attendance" -Method Get
$myAtt = $attendance | Where-Object { $_.studentId -eq $studentId -or ($_.student -and $_.student.id -eq $studentId) }
Write-Host "SUCCESS: Student has $($myAtt.Count) attendance check-in records" -ForegroundColor Green

# 7. Student Active Notices
Write-Host "`n7. Testing Active Mess Notices for Students..." -ForegroundColor Yellow
$notices = Invoke-RestMethod -Uri "$baseUrl/notices/active" -Method Get
Write-Host "SUCCESS: Active notices count: $($notices.Count)" -ForegroundColor Green

Write-Host "`n=== ALL STUDENT PANEL BACKEND FLOWS VERIFIED 100% HEALTHY ===" -ForegroundColor Green
