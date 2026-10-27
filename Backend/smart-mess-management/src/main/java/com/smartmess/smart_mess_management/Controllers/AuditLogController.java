package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.AuditLogService;
import com.smartmess.smart_mess_management.entity.AuditLog;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:4200")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public ResponseEntity<List<AuditLog>> getAll() {
        return ResponseEntity.ok(auditLogService.getAllLogs());
    }

    @GetMapping("/entity/{entityName}/{entityId}")
    public ResponseEntity<List<AuditLog>> getByEntity(
            @PathVariable String entityName,
            @PathVariable Long entityId) {
        return ResponseEntity.ok(auditLogService.getLogsByEntity(entityName, entityId));
    }
}
