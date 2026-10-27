package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.SupplierService;
import com.smartmess.smart_mess_management.entity.Supplier;
import com.smartmess.smart_mess_management.repository.SupplierRepository;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public Supplier createSupplier(Supplier supplier) {
        if (supplier.getIsActive() == null) {
            supplier.setIsActive(true);
        }
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));
    }

    @Override
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier updateSupplier(Long id, Supplier supplier) {
        Supplier existing = getSupplierById(id);

        if (supplier.getName() != null) existing.setName(supplier.getName());
        if (supplier.getContactPerson() != null) existing.setContactPerson(supplier.getContactPerson());
        if (supplier.getPhone() != null) existing.setPhone(supplier.getPhone());
        if (supplier.getEmail() != null) existing.setEmail(supplier.getEmail());
        if (supplier.getAddress() != null) existing.setAddress(supplier.getAddress());
        if (supplier.getCategory() != null) existing.setCategory(supplier.getCategory());
        if (supplier.getIsActive() != null) existing.setIsActive(supplier.getIsActive());

        return supplierRepository.save(existing);
    }

    @Override
    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }
}
