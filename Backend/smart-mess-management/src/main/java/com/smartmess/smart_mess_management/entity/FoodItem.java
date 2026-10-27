package com.smartmess.smart_mess_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import enums.FoodCategory;

@Entity
@Table(name = "food_items")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class FoodItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private FoodCategory category; // VEG, NON_VEG, BEVERAGE, SNACK

    @Builder.Default
    private Boolean isAvailable = true;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "canteen_id")
    private Canteen canteen;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long canteenId;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public FoodCategory getCategory() {
        return category;
    }

    public void setCategory(FoodCategory category) {
        this.category = category;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
}
