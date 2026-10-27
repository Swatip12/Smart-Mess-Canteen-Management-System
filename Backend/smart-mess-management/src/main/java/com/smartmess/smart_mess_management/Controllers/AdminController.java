package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.AdminService;
import com.smartmess.smart_mess_management.entity.Admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;

    public AdminController(AdminService adminService, PasswordEncoder passwordEncoder) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
    }


    // =========================
    // REGISTER ADMIN
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {

        if (admin.getEmail() == null || admin.getEmail().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        if (admin.getPassword() == null || admin.getPassword().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Password is required"));
        }

        if (adminService.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered"));
        }

        Admin savedAdmin = adminService.createAdmin(admin);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "message", "Registration successful",
                        "adminId", savedAdmin.getId()
                ));
    }


    // =========================
    // LOGIN ADMIN
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

        return adminService.findByEmail(email)
                .filter(admin -> {
                    String stored = admin.getPassword();
                    if (stored == null) return false;
                    if (stored.startsWith("$2a$") || stored.startsWith("$2b$")) {
                        return passwordEncoder.matches(password, stored);
                    }
                    return stored.equals(password);
                })
                .map(admin -> {
                    String stored = admin.getPassword();
                    if (stored != null && !stored.startsWith("$2a$") && !stored.startsWith("$2b$")) {
                        admin.setPassword(passwordEncoder.encode(password));
                        adminService.updateAdmin(admin.getId(), admin);
                    }
                    java.util.Map<String, Object> resp = new java.util.HashMap<>();
                    resp.put("message", "Login successful");
                    resp.put("adminId", admin.getId());
                    resp.put("name", admin.getName() != null ? admin.getName() : "Administrator");
                    resp.put("email", admin.getEmail() != null ? admin.getEmail() : "");
                    resp.put("role", admin.getRole() != null ? admin.getRole().toString() : "ADMIN");
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

    @GetMapping
    public ResponseEntity<List<Admin>> getAll() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getAdminById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> update(@PathVariable Long id, @RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.updateAdmin(id, admin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
