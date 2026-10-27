package com.smartmess.smart_mess_management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.smartmess.smart_mess_management.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findAllByOrderByTimestampDesc();

    List<AuditLog> findByEntityNameAndEntityIdOrderByTimestampDesc(String entityName, Long entityId);
}
