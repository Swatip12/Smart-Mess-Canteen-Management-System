package com.smartmess.smart_mess_management.Controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartmess.smart_mess_management.Services.CanteenService;
import com.smartmess.smart_mess_management.entity.Canteen;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/canteens")
public class CanteenController {

    private final CanteenService canteenService;

    public CanteenController(CanteenService canteenService) {
        this.canteenService = canteenService;
    }

    @PostMapping
    public ResponseEntity<Canteen> create(
            @Valid @RequestBody Canteen canteen) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(canteenService.createCanteen(canteen));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Canteen> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                canteenService.getCanteenById(id));
    }

    @GetMapping
    public ResponseEntity<List<Canteen>> getAll() {

        return ResponseEntity.ok(
                canteenService.getAllCanteens());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Canteen> update(
            @PathVariable Long id,
            @Valid @RequestBody Canteen canteen) {

        return ResponseEntity.ok(
                canteenService.updateCanteen(id, canteen));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        canteenService.deleteCanteen(id);

        return ResponseEntity.noContent().build();
    }
}