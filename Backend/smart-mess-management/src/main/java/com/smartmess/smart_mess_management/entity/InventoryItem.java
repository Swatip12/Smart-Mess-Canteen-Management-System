package com.smartmess.smart_mess_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import enums.InventoryCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private InventoryCategory category;

    @NotNull
    private Double quantity;

    @NotBlank
    private String unit; // KG, LTR, PACKET, GM, PIECE

    private Double minimumThreshold; // Low stock threshold

    private BigDecimal unitCost;

    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess mess;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long messId;

    private LocalDateTime lastRestockedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Boolean isLowStock() {
        if (minimumThreshold == null || quantity == null) return false;
        return quantity <= minimumThreshold;
    }
}
