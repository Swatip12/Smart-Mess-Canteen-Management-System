package com.smartmess.smart_mess_management.Services;
import java.util.List;
import java.util.Optional;

import com.smartmess.smart_mess_management.entity.Admin;

public interface AdminService {
    Admin createAdmin(Admin admin);
    Admin getAdminById(Long id);
    List<Admin> getAllAdmins();
    Admin updateAdmin(Long id, Admin admin);
    void deleteAdmin(Long id);
    Optional<Admin> findByEmail(String email);
}