package com.smartmess.smart_mess_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import enums.StockMovementType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "stock_movements")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "inventory_item_id")
    private InventoryItem inventoryItem;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long inventoryItemId;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StockMovementType type; // PURCHASE, CONSUMPTION, WASTAGE, ADJUSTMENT

    @NotNull
    private Double quantity;

    private String reason;

    private String performedBy;

    @CreationTimestamp
    private LocalDateTime movementDate;
}
