package com.smartmess.smart_mess_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmess.smart_mess_management.entity.Complaint;

import enums.ComplaintStatus;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByStatus(ComplaintStatus status);
}
