package com.smartmess.smart_mess_management.repository;


import com.smartmess.smart_mess_management.entity.Canteen;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CanteenRepository extends JpaRepository<Canteen, Long> {

    List<Canteen> findByIsActive(Boolean isActive);
}