package com.smartmess.smart_mess_management.Services;

import java.util.List;
import com.smartmess.smart_mess_management.entity.Supplier;

public interface SupplierService {

    Supplier createSupplier(Supplier supplier);

    Supplier getSupplierById(Long id);

    List<Supplier> getAllSuppliers();

    Supplier updateSupplier(Long id, Supplier supplier);

    void deleteSupplier(Long id);
}
