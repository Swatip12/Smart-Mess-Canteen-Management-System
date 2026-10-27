package com.smartmess.smart_mess_management.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmess.smart_mess_management.entity.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
}