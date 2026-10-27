package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.StudentService;
import com.smartmess.smart_mess_management.entity.Student;
import com.smartmess.smart_mess_management.repository.StudentRepository;

import enums.StudentStatus;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentServiceImpl(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Student createStudent(Student student) {
        if (student.getStatus() == null) {
            student.setStatus(StudentStatus.ACTIVE);
        }

        if (student.getPassword() != null && !student.getPassword().isBlank()) {
            if (!student.getPassword().startsWith("$2a$") && !student.getPassword().startsWith("$2b$")) {
                student.setPassword(passwordEncoder.encode(student.getPassword()));
            }
        }

        return studentRepository.save(student);
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Student not found with id: " + id
                    )
                );
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        Student existing = getStudentById(id);

        if (student.getName() != null) existing.setName(student.getName());
        if (student.getEmail() != null && !student.getEmail().isBlank()) existing.setEmail(student.getEmail());
        if (student.getPassword() != null && !student.getPassword().isBlank()) {
            if (!student.getPassword().startsWith("$2a$") && !student.getPassword().startsWith("$2b$")) {
                existing.setPassword(passwordEncoder.encode(student.getPassword()));
            } else {
                existing.setPassword(student.getPassword());
            }
        }
        if (student.getPhone() != null) existing.setPhone(student.getPhone());
        if (student.getRollNumber() != null) existing.setRollNumber(student.getRollNumber());
        if (student.getDepartment() != null) existing.setDepartment(student.getDepartment());
        if (student.getHostelName() != null) existing.setHostelName(student.getHostelName());
        if (student.getRoomNumber() != null) existing.setRoomNumber(student.getRoomNumber());
        if (student.getStatus() != null) existing.setStatus(student.getStatus());

        return studentRepository.save(existing);
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public Optional<Student> findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}
