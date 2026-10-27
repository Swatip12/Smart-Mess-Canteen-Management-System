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

import com.smartmess.smart_mess_management.Services.MessService;
import com.smartmess.smart_mess_management.entity.Mess;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/messes")
public class MessController {

    private final MessService messService;

    public MessController(MessService messService) {
        this.messService = messService;
    }

    @PostMapping
    public ResponseEntity<Mess> create(
            @Valid @RequestBody Mess mess) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(messService.createMess(mess));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mess> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                messService.getMessById(id));
    }

    @GetMapping
    public ResponseEntity<List<Mess>> getAll() {

        return ResponseEntity.ok(
                messService.getAllMesses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mess> update(
            @PathVariable Long id,
            @Valid @RequestBody Mess mess) {

        return ResponseEntity.ok(
                messService.updateMess(id, mess));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        messService.deleteMess(id);

        return ResponseEntity.noContent().build();
    }
}