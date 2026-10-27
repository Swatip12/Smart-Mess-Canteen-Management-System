package com.smartmess.smart_mess_management.service;

import com.smartmess.smart_mess_management.entity.InventoryItem;
import com.smartmess.smart_mess_management.entity.StockMovement;
import com.smartmess.smart_mess_management.repository.InventoryItemRepository;
import com.smartmess.smart_mess_management.repository.MessRepository;
import com.smartmess.smart_mess_management.repository.StockMovementRepository;
import com.smartmess.smart_mess_management.serviceimpl.InventoryServiceImpl;
import enums.StockMovementType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Kitchen Inventory & Stock Movements Tests")
public class InventoryServiceTests {

    @Mock
    private InventoryItemRepository inventoryItemRepository;
    @Mock
    private StockMovementRepository stockMovementRepository;
    @Mock
    private MessRepository messRepository;

    @InjectMocks
    private InventoryServiceImpl inventoryService;

    private InventoryItem testItem;

    @BeforeEach
    void setUp() {
        testItem = InventoryItem.builder()
                .id(1L)
                .name("Basmati Rice")
                .quantity(50.0)
                .minimumThreshold(15.0)
                .unit("KG")
                .build();
    }

    @Test
    @DisplayName("Stock Purchase increases available quantity")
    void testPurchaseIncreasesQuantity() {
        when(inventoryItemRepository.findById(1L)).thenReturn(Optional.of(testItem));
        when(inventoryItemRepository.save(any(InventoryItem.class))).thenAnswer(i -> i.getArgument(0));
        when(stockMovementRepository.save(any(StockMovement.class))).thenAnswer(i -> i.getArgument(0));

        StockMovement purchase = StockMovement.builder()
                .quantity(25.0)
                .type(StockMovementType.PURCHASE)
                .reason("Weekly replenishment")
                .performedBy("Manager")
                .build();

        StockMovement result = inventoryService.recordMovement(1L, purchase);

        assertNotNull(result);
        assertEquals(75.0, testItem.getQuantity());
        verify(inventoryItemRepository).save(testItem);
    }

    @Test
    @DisplayName("Stock Consumption decreases available quantity")
    void testConsumptionDecreasesQuantity() {
        when(inventoryItemRepository.findById(1L)).thenReturn(Optional.of(testItem));
        when(inventoryItemRepository.save(any(InventoryItem.class))).thenAnswer(i -> i.getArgument(0));
        when(stockMovementRepository.save(any(StockMovement.class))).thenAnswer(i -> i.getArgument(0));

        StockMovement consumption = StockMovement.builder()
                .quantity(20.0)
                .type(StockMovementType.CONSUMPTION)
                .reason("Lunch meal batch")
                .performedBy("Chef")
                .build();

        StockMovement result = inventoryService.recordMovement(1L, consumption);

        assertNotNull(result);
        assertEquals(30.0, testItem.getQuantity());
    }

    @Test
    @DisplayName("Stock Consumption exceeding available quantity throws IllegalArgumentException")
    void testConsumptionExceedingStockThrowsException() {
        when(inventoryItemRepository.findById(1L)).thenReturn(Optional.of(testItem));

        StockMovement excessConsumption = StockMovement.builder()
                .quantity(90.0) // Only 50.0 available
                .type(StockMovementType.CONSUMPTION)
                .reason("Large catering event")
                .performedBy("Chef")
                .build();

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            inventoryService.recordMovement(1L, excessConsumption);
        });

        assertTrue(ex.getMessage().contains("Insufficient stock"));
        verify(stockMovementRepository, never()).save(any());
    }

    @Test
    @DisplayName("Low stock detection correctly identifies items at or below threshold")
    void testLowStockFlag() {
        testItem.setQuantity(10.0); // Minimum threshold is 15.0
        assertTrue(testItem.isLowStock());

        testItem.setQuantity(20.0);
        assertFalse(testItem.isLowStock());
    }
}
