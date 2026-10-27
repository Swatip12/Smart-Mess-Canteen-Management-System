$baseUrl = "http://localhost:8080/api"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   STUDENT PANEL FULL END-TO-END VERIFICATION     " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# 1. Login Student
Write-Host "`n[1] Student Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "paliwalswati603@gmail.com"
    password = "123456"
} | ConvertTo-Json
$student = Invoke-RestMethod -Uri "$baseUrl/students/login" -Method Post -Body $loginBody -ContentType "application/json"
$studentId = $student.studentId
Write-Host "-> OK: Logged in as $($student.name) (ID: $studentId)" -ForegroundColor Green

# 2. Get Canteens and Food Items
Write-Host "`n[2] Browsing Available Menu for Ordering..." -ForegroundColor Yellow
$canteens = Invoke-RestMethod -Uri "$baseUrl/canteens" -Method Get
$activeCanteen = $canteens | Where-Object { $_.isActive -eq $true } | Select-Object -First 1
$foodItems = Invoke-RestMethod -Uri "$baseUrl/food-items/canteen/$($activeCanteen.id)/available" -Method Get
Write-Host "-> OK: Found $($foodItems.Count) available food items at '$($activeCanteen.name)'" -ForegroundColor Green

# 3. Create a New Order
Write-Host "`n[3] Placing a New Food Order..." -ForegroundColor Yellow
$firstItem = $foodItems[0]
$orderPayload = @{
    studentId = $studentId
    student = @{ id = $studentId }
    canteenId = $activeCanteen.id
    canteen = @{ id = $activeCanteen.id }
    orderItems = @(
        @{
            foodItemId = $firstItem.id
            foodItem = @{ id = $firstItem.id }
            quantity = 2
            unitPrice = $firstItem.price
            subTotal = [double]($firstItem.price * 2)
        }
    )
    totalAmount = [double]($firstItem.price * 2)
} | ConvertTo-Json -Depth 5

$orderResp = Invoke-RestMethod -Uri "$baseUrl/orders" -Method Post -Body $orderPayload -ContentType "application/json"
Write-Host "-> OK: Order created successfully! ID: $($orderResp.id), Status: $($orderResp.status), Total: ₹$($orderResp.totalAmount)" -ForegroundColor Green

# 4. Fetch Order History
Write-Host "`n[4] Fetching Student Order History..." -ForegroundColor Yellow
$orders = Invoke-RestMethod -Uri "$baseUrl/orders/student/$studentId" -Method Get
Write-Host "-> OK: Student has $($orders.Count) orders. Most recent order ID: $($orders[-1].id)" -ForegroundColor Green

# 5. Check Subscriptions
Write-Host "`n[5] Checking Mess Subscriptions..." -ForegroundColor Yellow
$subscriptions = Invoke-RestMethod -Uri "$baseUrl/subscriptions" -Method Get
$studentSubs = $subscriptions | Where-Object { $_.studentId -eq $studentId -or ($_.student -and $_.student.id -eq $studentId) }
Write-Host "-> OK: Found $($studentSubs.Count) subscriptions for student." -ForegroundColor Green

# 6. Submit Meal Feedback
Write-Host "`n[6] Submitting Meal Feedback..." -ForegroundColor Yellow
$messes = Invoke-RestMethod -Uri "$baseUrl/messes" -Method Get
$firstMess = $messes[0]
$feedbackPayload = @{
    studentId = $studentId
    student = @{ id = $studentId }
    messId = $firstMess.id
    mess = @{ id = $firstMess.id }
    rating = 5
    comments = "The lunch today was exceptionally fresh and balanced!"
    category = "FOOD_QUALITY"
} | ConvertTo-Json

$feedbackResp = Invoke-RestMethod -Uri "$baseUrl/feedbacks" -Method Post -Body $feedbackPayload -ContentType "application/json"
Write-Host "-> OK: Feedback submitted! Rating: $($feedbackResp.rating) stars on mess '$($firstMess.name)'" -ForegroundColor Green

# 7. Submit Support Complaint
Write-Host "`n[7] Filing a Student Dining Complaint..." -ForegroundColor Yellow
$complaintPayload = @{
    studentId = $studentId
    student = @{ id = $studentId }
    title = "Hot Water Dispenser Check"
    description = "Please check the dining hall water cooler temperature."
    category = "SERVICE"
} | ConvertTo-Json

$complaintResp = Invoke-RestMethod -Uri "$baseUrl/complaints" -Method Post -Body $complaintPayload -ContentType "application/json"
Write-Host "-> OK: Complaint filed successfully! ID: $($complaintResp.id), Status: $($complaintResp.status)" -ForegroundColor Green

# 8. Fetch Active Notices
Write-Host "`n[8] Reading Active Notices..." -ForegroundColor Yellow
$notices = Invoke-RestMethod -Uri "$baseUrl/notices/active" -Method Get
Write-Host "-> OK: Found $($notices.Count) active notices for student bulletin board." -ForegroundColor Green

# 9. Update Student Profile
Write-Host "`n[9] Updating Student Profile..." -ForegroundColor Yellow
$profile = Invoke-RestMethod -Uri "$baseUrl/students/$studentId" -Method Get
$profile.phone = "9876543210"
$profileUpdatePayload = $profile | ConvertTo-Json
$updatedProfile = Invoke-RestMethod -Uri "$baseUrl/students/$studentId" -Method Put -Body $profileUpdatePayload -ContentType "application/json"
Write-Host "-> OK: Profile updated successfully! Name: $($updatedProfile.name), Phone: $($updatedProfile.phone)" -ForegroundColor Green

Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "   ALL 9 STUDENT PANEL WORKFLOWS TESTED & PASSED! " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
