package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.ComplaintService;
import com.smartmess.smart_mess_management.entity.Complaint;

import enums.ComplaintStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<Complaint> create(
            @RequestBody Complaint complaint) {

        return ResponseEntity.ok(
                complaintService.createComplaint(complaint));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                complaintService.getComplaintById(id));
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAll() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Complaint> update(
            @PathVariable Long id,
            @RequestBody Complaint complaint) {

        return ResponseEntity.ok(
                complaintService.updateComplaint(id, complaint));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        complaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status")
    public ResponseEntity<List<Complaint>> getByStatus(
            @RequestParam ComplaintStatus status) {

        return ResponseEntity.ok(
                complaintService.getComplaintsByStatus(status));
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Complaint> resolve(
            @PathVariable Long id,
            @RequestParam String resolution) {

        return ResponseEntity.ok(
                complaintService.resolveComplaint(id, resolution));
    }
}