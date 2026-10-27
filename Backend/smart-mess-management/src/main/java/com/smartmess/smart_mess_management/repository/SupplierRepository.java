package com.smartmess.smart_mess_management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.smartmess.smart_mess_management.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    List<Supplier> findByIsActiveTrue();
}
