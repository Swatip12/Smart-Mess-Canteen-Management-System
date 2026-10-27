package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.InventoryService;
import com.smartmess.smart_mess_management.entity.InventoryItem;
import com.smartmess.smart_mess_management.entity.StockMovement;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:4200")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<InventoryItem> create(@Valid @RequestBody InventoryItem item) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.createItem(item));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryItem> getById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<InventoryItem>> getAll() {
        return ResponseEntity.ok(inventoryService.getAllItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> update(
            @PathVariable Long id,
            @RequestBody InventoryItem item) {
        return ResponseEntity.ok(inventoryService.updateItem(id, item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inventoryService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<InventoryItem>> getLowStock() {
        return ResponseEntity.ok(inventoryService.getLowStockItems());
    }

    @PostMapping("/{id}/movement")
    public ResponseEntity<StockMovement> recordMovement(
            @PathVariable Long id,
            @Valid @RequestBody StockMovement movement) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(inventoryService.recordMovement(id, movement));
    }

    @GetMapping("/{id}/movements")
    public ResponseEntity<List<StockMovement>> getMovements(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getMovementsByItem(id));
    }
}
