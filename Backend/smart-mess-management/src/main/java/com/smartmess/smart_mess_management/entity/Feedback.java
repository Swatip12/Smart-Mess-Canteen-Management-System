package com.smartmess.smart_mess_management.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import enums.FeedbackCategory;

import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Feedback {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long studentId;

    @ManyToOne
    @JoinColumn(name = "mess_id")
    private Mess mess;

    @Transient
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long messId;

    @Min(1) @Max(5)
    private Integer rating;

    @Column(length = 1000)
    private String comment;

    @Enumerated(EnumType.STRING)
    private FeedbackCategory category; // FOOD_QUALITY, CLEANLINESS, SERVICE, TIMING

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Long getStudentId() {
        return student != null ? student.getId() : studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Mess getMess() {
        return mess;
    }

    public void setMess(Mess mess) {
        this.mess = mess;
    }

    public Long getMessId() {
        return mess != null ? mess.getId() : messId;
    }

    public void setMessId(Long messId) {
        this.messId = messId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public FeedbackCategory getCategory() {
        return category;
    }

    public void setCategory(FeedbackCategory category) {
        this.category = category;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
