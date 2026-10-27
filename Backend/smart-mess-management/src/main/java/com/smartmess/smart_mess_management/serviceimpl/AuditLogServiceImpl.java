package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.smartmess.smart_mess_management.Services.AuditLogService;
import com.smartmess.smart_mess_management.entity.AuditLog;
import com.smartmess.smart_mess_management.repository.AuditLogRepository;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public AuditLog log(String actorEmail, String actorRole, String action, String entityName, Long entityId, String details) {
        AuditLog auditLog = AuditLog.builder()
                .actorEmail(actorEmail != null ? actorEmail : "system")
                .actorRole(actorRole != null ? actorRole : "SYSTEM")
                .action(action)
                .entityName(entityName)
                .entityId(entityId)
                .details(details)
                .build();
        return auditLogRepository.save(auditLog);
    }

    @Override
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }

    @Override
    public List<AuditLog> getLogsByEntity(String entityName, Long entityId) {
        return auditLogRepository.findByEntityNameAndEntityIdOrderByTimestampDesc(entityName, entityId);
    }
}
