package com.smartmess.smart_mess_management.Services;




import java.util.List;
import java.util.Optional;

import com.smartmess.smart_mess_management.entity.Student;
public interface StudentService {
    Student createStudent(Student student);
    Student getStudentById(Long id);
    List<Student> getAllStudents();
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
    Optional<Student> findByEmail(String email);
}