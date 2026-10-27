package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.AdminService;
import com.smartmess.smart_mess_management.entity.Admin;
import com.smartmess.smart_mess_management.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Admin createAdmin(Admin admin) {
        if (admin.getPassword() != null && !admin.getPassword().isBlank()) {
            if (!admin.getPassword().startsWith("$2a$") && !admin.getPassword().startsWith("$2b$")) {
                admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            }
        }
        return adminRepository.save(admin);
    }

    @Override
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Admin not found with id: " + id
                        )
                );
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin updateAdmin(Long id, Admin admin) {
        Admin existing = getAdminById(id);

        if (admin.getName() != null) existing.setName(admin.getName());
        if (admin.getPhone() != null) existing.setPhone(admin.getPhone());
        if (admin.getRole() != null) existing.setRole(admin.getRole());
        if (admin.getPassword() != null && !admin.getPassword().isBlank()) {
            if (!admin.getPassword().startsWith("$2a$") && !admin.getPassword().startsWith("$2b$")) {
                existing.setPassword(passwordEncoder.encode(admin.getPassword()));
            } else {
                existing.setPassword(admin.getPassword());
            }
        }

        return adminRepository.save(existing);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}
