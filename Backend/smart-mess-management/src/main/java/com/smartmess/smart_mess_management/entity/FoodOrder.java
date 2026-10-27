package com.smartmess.smart_mess_management.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import enums.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "food_orders")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class FoodOrder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long studentId;

    @ManyToOne
    @JoinColumn(name = "canteen_id")
    private Canteen canteen;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long canteenId;

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // PENDING, CONFIRMED, READY, DELIVERED, CANCELLED

    private BigDecimal totalAmount;

    @CreationTimestamp
    private LocalDateTime orderedAt;

    @OneToMany(mappedBy = "foodOrder", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FoodOrderItem> orderItems;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Long getStudentId() {
        return student != null ? student.getId() : studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Canteen getCanteen() {
        return canteen;
    }

    public void setCanteen(Canteen canteen) {
        this.canteen = canteen;
    }

    public Long getCanteenId() {
        return canteen != null ? canteen.getId() : canteenId;
    }

    public void setCanteenId(Long canteenId) {
        this.canteenId = canteenId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getOrderedAt() {
        return orderedAt;
    }

    public void setOrderedAt(LocalDateTime orderedAt) {
        this.orderedAt = orderedAt;
    }

    public List<FoodOrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<FoodOrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
