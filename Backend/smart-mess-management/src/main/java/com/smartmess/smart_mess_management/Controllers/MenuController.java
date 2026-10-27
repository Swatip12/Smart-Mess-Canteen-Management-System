package com.smartmess.smart_mess_management.Controllers;


import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
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

import com.smartmess.smart_mess_management.Services.MenuService;
import com.smartmess.smart_mess_management.entity.Menu;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping
    public ResponseEntity<Menu> create(
            @Valid @RequestBody Menu menu) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(menuService.createMenu(menu));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Menu> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                menuService.getMenuById(id));
    }

    @GetMapping
    public ResponseEntity<List<Menu>> getAll() {

        return ResponseEntity.ok(
                menuService.getAllMenus());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Menu> update(
            @PathVariable Long id,
            @Valid @RequestBody Menu menu) {

        return ResponseEntity.ok(
                menuService.updateMenu(id, menu));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        menuService.deleteMenu(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mess/{messId}/date/{date}")
    public ResponseEntity<List<Menu>> getByMessAndDate(
            @PathVariable Long messId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return ResponseEntity.ok(
                menuService.getMenuByMessAndDate(messId, date));
    }
}