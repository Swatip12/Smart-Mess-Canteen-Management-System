package com.smartmess.smart_mess_management.Services;

import java.util.List;
import com.smartmess.smart_mess_management.entity.AuditLog;

public interface AuditLogService {

    AuditLog log(String actorEmail, String actorRole, String action, String entityName, Long entityId, String details);

    List<AuditLog> getAllLogs();

    List<AuditLog> getLogsByEntity(String entityName, Long entityId);
}
