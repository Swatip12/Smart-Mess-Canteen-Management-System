package com.smartmess.smart_mess_management.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmess.smart_mess_management.entity.Student;

import enums.StudentStatus;

import java.util.List;
import java.util.Optional;
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findByRollNumber(String rollNumber);
    List<Student> findByStatus(StudentStatus status);
}