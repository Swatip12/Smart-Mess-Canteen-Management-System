package com.smartmess.smart_mess_management.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmess.smart_mess_management.entity.Notice;

import enums.NoticeType;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findByIsActiveTrue();

    List<Notice> findByType(NoticeType type);
}