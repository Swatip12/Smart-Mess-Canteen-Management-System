package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.StudentService;
import com.smartmess.smart_mess_management.entity.Student;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

    private final StudentService studentService;
    private final PasswordEncoder passwordEncoder;

    public StudentController(StudentService studentService, PasswordEncoder passwordEncoder) {
        this.studentService = studentService;
        this.passwordEncoder = passwordEncoder;
    }


    // =========================
    // REGISTER STUDENT
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {

        if (student.getEmail() == null || student.getEmail().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        if (student.getPassword() == null || student.getPassword().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Password is required"));
        }

        if (studentService.findByEmail(student.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered"));
        }

        Student savedStudent = studentService.createStudent(student);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "message", "Registration successful",
                        "studentId", savedStudent.getId()
                ));
    }


    // =========================
    // LOGIN STUDENT
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> credentials) {

        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        return studentService.findByEmail(email)
                .filter(student -> {
                    String stored = student.getPassword();
                    if (stored == null) return false;
                    if (stored.startsWith("$2a$") || stored.startsWith("$2b$")) {
                        return passwordEncoder.matches(password, stored);
                    }
                    return stored.equals(password);
                })
                .map(student -> {
                    String stored = student.getPassword();
                    if (stored != null && !stored.startsWith("$2a$") && !stored.startsWith("$2b$")) {
                        student.setPassword(passwordEncoder.encode(password));
                        studentService.updateStudent(student.getId(), student);
                    }
                    java.util.Map<String, Object> resp = new java.util.HashMap<>();
                    resp.put("message", "Login successful");
                    resp.put("studentId", student.getId());
                    resp.put("name", student.getName() != null ? student.getName() : "Student");
                    resp.put("email", student.getEmail() != null ? student.getEmail() : "");
                    resp.put("rollNumber", student.getRollNumber() != null ? student.getRollNumber() : "");
                    resp.put("department", student.getDepartment() != null ? student.getDepartment() : "");
                    resp.put("hostelName", student.getHostelName() != null ? student.getHostelName() : "");
                    resp.put("roomNumber", student.getRoomNumber() != null ? student.getRoomNumber() : "");
                    return ResponseEntity.ok(resp);
                })
                .orElse(
                        ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(Map.of(
                                        "message",
                                        "Invalid email or password"
                                ))
                );
    }


    // =========================
    // CRUD OPERATIONS
    // =========================

    @PostMapping
    public ResponseEntity<Student> create(
            @Valid @RequestBody Student student) {

        System.out.println("POST /api/students CALLED");

        Student savedStudent =
                studentService.createStudent(student);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedStudent);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAll() {

        return ResponseEntity.ok(
                studentService.getAllStudents()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.getStudentById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(
            @PathVariable Long id,
            @RequestBody Student student) {

        return ResponseEntity.ok(
                studentService.updateStudent(id, student)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.noContent().build();
    }
}
