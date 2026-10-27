package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.FeedbackService;
import com.smartmess.smart_mess_management.entity.Feedback;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<Feedback> create(
            @RequestBody Feedback feedback) {

        return ResponseEntity.ok(
                feedbackService.createFeedback(feedback));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                feedbackService.getFeedbackById(id));
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAll() {

        return ResponseEntity.ok(
                feedbackService.getAllFeedbacks());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> update(
            @PathVariable Long id,
            @RequestBody Feedback feedback) {

        return ResponseEntity.ok(
                feedbackService.updateFeedback(id, feedback));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}