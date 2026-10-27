package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.Feedback;

public interface FeedbackService {

    Feedback createFeedback(Feedback feedback);

    Feedback getFeedbackById(Long id);

    List<Feedback> getAllFeedbacks();

    Feedback updateFeedback(Long id, Feedback feedback);

    void deleteFeedback(Long id);
}