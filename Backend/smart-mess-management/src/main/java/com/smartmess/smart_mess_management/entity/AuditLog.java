package com.smartmess.smart_mess_management.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actorEmail;

    private String actorRole;

    @NotBlank
    @Column(nullable = false)
    private String action; // e.g. "RESOLVE_COMPLAINT", "UPDATE_ORDER_STATUS", "RECORD_STOCK_MOVEMENT"

    private String entityName;

    private Long entityId;

    @Column(length = 1000)
    private String details;

    @CreationTimestamp
    private LocalDateTime timestamp;
}
