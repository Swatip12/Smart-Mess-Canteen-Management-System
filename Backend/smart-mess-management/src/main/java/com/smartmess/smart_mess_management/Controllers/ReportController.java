package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.entity.FoodOrder;
import com.smartmess.smart_mess_management.entity.Payment;
import com.smartmess.smart_mess_management.repository.*;
import enums.ComplaintStatus;
import enums.OrderStatus;
import enums.PaymentStatus;
import enums.SubscriptionStatus;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    private final StudentRepository studentRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final FoodOrderRepository foodOrderRepository;
    private final ComplaintRepository complaintRepository;
    private final PaymentRepository paymentRepository;
    private final InventoryItemRepository inventoryItemRepository;

    public ReportController(
            StudentRepository studentRepository,
            SubscriptionRepository subscriptionRepository,
            FoodOrderRepository foodOrderRepository,
            ComplaintRepository complaintRepository,
            PaymentRepository paymentRepository,
            InventoryItemRepository inventoryItemRepository) {
        this.studentRepository = studentRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.foodOrderRepository = foodOrderRepository;
        this.complaintRepository = complaintRepository;
        this.paymentRepository = paymentRepository;
        this.inventoryItemRepository = inventoryItemRepository;
    }

    @GetMapping("/dashboard-summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();

        long totalStudents = studentRepository.count();
        long activeSubs = subscriptionRepository.findAll().stream()
                .filter(s -> s.getStatus() == SubscriptionStatus.ACTIVE)
                .count();
        long pendingOrders = foodOrderRepository.countByStatus(OrderStatus.PENDING);
        long openComplaints = complaintRepository.findByStatus(ComplaintStatus.OPEN).size();
        long lowStockCount = inventoryItemRepository.findLowStockItems().size();

        BigDecimal totalRevenue = paymentRepository.sumAmountByStatus(PaymentStatus.COMPLETED);
        LocalDateTime startOfToday = LocalDate.now().atStartOfDay();
        BigDecimal todayRevenue = paymentRepository.sumAmountByStatusAndPaidAtAfter(PaymentStatus.COMPLETED, startOfToday);

        summary.put("totalStudents", totalStudents);
        summary.put("activeSubscriptions", activeSubs);
        summary.put("pendingOrders", pendingOrders);
        summary.put("openComplaints", openComplaints);
        summary.put("lowStockCount", lowStockCount);
        summary.put("totalRevenue", totalRevenue != null ? totalRevenue : BigDecimal.ZERO);
        summary.put("todayRevenue", todayRevenue != null ? todayRevenue : BigDecimal.ZERO);

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/csv/payments")
    public ResponseEntity<byte[]> exportPaymentsCsv() {
        List<Payment> payments = paymentRepository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("Payment ID,Transaction ID,Student ID,Student Name,Type,Amount,Status,Payment Method,Paid At\n");

        for (Payment p : payments) {
            String studentName = p.getStudent() != null ? p.getStudent().getName().replace(",", " ") : "N/A";
            Long studentId = p.getStudent() != null ? p.getStudent().getId() : 0L;
            csv.append(String.format("%d,%s,%d,\"%s\",%s,%.2f,%s,%s,%s\n",
                    p.getId(),
                    p.getTransactionId() != null ? p.getTransactionId() : "N/A",
                    studentId,
                    studentName,
                    p.getType() != null ? p.getType() : "N/A",
                    p.getAmount() != null ? p.getAmount() : BigDecimal.ZERO,
                    p.getStatus() != null ? p.getStatus() : "N/A",
                    p.getPaymentMethod() != null ? p.getPaymentMethod() : "N/A",
                    p.getPaidAt() != null ? p.getPaidAt().toString() : "N/A"
            ));
        }

        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"payments_export.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }

    @GetMapping("/csv/orders")
    public ResponseEntity<byte[]> exportOrdersCsv() {
        List<FoodOrder> orders = foodOrderRepository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("Order ID,Student ID,Student Name,Canteen Name,Total Amount,Status,Ordered At\n");

        for (FoodOrder o : orders) {
            String studentName = o.getStudent() != null ? o.getStudent().getName().replace(",", " ") : "N/A";
            Long studentId = o.getStudent() != null ? o.getStudent().getId() : 0L;
            String canteenName = o.getCanteen() != null ? o.getCanteen().getName().replace(",", " ") : "N/A";

            csv.append(String.format("%d,%d,\"%s\",\"%s\",%.2f,%s,%s\n",
                    o.getId(),
                    studentId,
                    studentName,
                    canteenName,
                    o.getTotalAmount() != null ? o.getTotalAmount() : BigDecimal.ZERO,
                    o.getStatus() != null ? o.getStatus() : "N/A",
                    o.getOrderedAt() != null ? o.getOrderedAt().toString() : "N/A"
            ));
        }

        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"orders_export.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }
}
