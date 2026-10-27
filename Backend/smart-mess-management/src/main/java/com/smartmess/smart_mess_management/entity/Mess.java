package com.smartmess.smart_mess_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import enums.MessType;

import java.time.LocalDateTime;

@Entity
@Table(name = "messes")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Mess {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    private String location;
    private String contactNumber;
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private MessType type; // VEG, NON_VEG, BOTH

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long adminId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public MessType getType() {
        return type;
    }

    public void setType(MessType type) {
        this.type = type;
    }

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public Long getAdminId() {
        return admin != null ? admin.getId() : adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
