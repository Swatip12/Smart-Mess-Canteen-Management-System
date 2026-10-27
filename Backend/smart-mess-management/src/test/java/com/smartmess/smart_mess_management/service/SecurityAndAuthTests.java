package com.smartmess.smart_mess_management.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.smartmess.smart_mess_management.entity.Admin;
import com.smartmess.smart_mess_management.entity.Student;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Security & Authentication Hardening Tests")
public class SecurityAndAuthTests {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    @DisplayName("BCrypt correctly encodes and matches raw passwords")
    void testBCryptPasswordEncodingAndMatching() {
        String rawPassword = "SecureMessPassword@2026";
        String encodedHash = passwordEncoder.encode(rawPassword);

        assertNotNull(encodedHash);
        assertNotEquals(rawPassword, encodedHash);
        assertTrue(encodedHash.startsWith("$2a$") || encodedHash.startsWith("$2b$"));
        assertTrue(passwordEncoder.matches(rawPassword, encodedHash));
        assertFalse(passwordEncoder.matches("WrongPassword", encodedHash));
    }

    @Test
    @DisplayName("Admin entity password is strictly WRITE_ONLY to prevent JSON credential leaks")
    void testAdminPasswordAnnotationIsWriteOnly() throws Exception {
        Field passwordField = Admin.class.getDeclaredField("password");
        JsonProperty annotation = passwordField.getAnnotation(JsonProperty.class);

        assertNotNull(annotation, "Admin.password must be annotated with @JsonProperty");
        assertEquals(JsonProperty.Access.WRITE_ONLY, annotation.access(),
                "Admin password field MUST have WRITE_ONLY access to prevent REST API leaks");
    }

    @Test
    @DisplayName("Student entity password is strictly WRITE_ONLY to prevent JSON credential leaks")
    void testStudentPasswordAnnotationIsWriteOnly() throws Exception {
        Field passwordField = Student.class.getDeclaredField("password");
        JsonProperty annotation = passwordField.getAnnotation(JsonProperty.class);

        assertNotNull(annotation, "Student.password must be annotated with @JsonProperty");
        assertEquals(JsonProperty.Access.WRITE_ONLY, annotation.access(),
                "Student password field MUST have WRITE_ONLY access to prevent REST API leaks");
    }
}
