package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.FeedbackService;
import com.smartmess.smart_mess_management.entity.Feedback;
import com.smartmess.smart_mess_management.repository.FeedbackRepository;
import com.smartmess.smart_mess_management.repository.MessRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final StudentRepository studentRepository;
    private final MessRepository messRepository;

    public FeedbackServiceImpl(
            FeedbackRepository feedbackRepository,
            StudentRepository studentRepository,
            MessRepository messRepository) {
        this.feedbackRepository = feedbackRepository;
        this.studentRepository = studentRepository;
        this.messRepository = messRepository;
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        Long sId = feedback.getStudentId();
        if (sId == null && feedback.getStudent() != null) {
            sId = feedback.getStudent().getId();
        }
        if (sId != null) {
            studentRepository.findById(sId).ifPresent(feedback::setStudent);
        }

        Long mId = feedback.getMessId();
        if (mId == null && feedback.getMess() != null) {
            mId = feedback.getMess().getId();
        }
        if (mId != null) {
            messRepository.findById(mId).ifPresent(feedback::setMess);
        }
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Feedback not found with id: " + id));
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedback) {

        Feedback existing = getFeedbackById(id);

        if (feedback.getStudent() != null) {
            existing.setStudent(feedback.getStudent());
        } else if (feedback.getStudentId() != null) {
            studentRepository.findById(feedback.getStudentId()).ifPresent(existing::setStudent);
        }

        if (feedback.getMess() != null) {
            existing.setMess(feedback.getMess());
        } else if (feedback.getMessId() != null) {
            messRepository.findById(feedback.getMessId()).ifPresent(existing::setMess);
        }

        if (feedback.getRating() != null) existing.setRating(feedback.getRating());
        if (feedback.getComment() != null) existing.setComment(feedback.getComment());
        if (feedback.getCategory() != null) existing.setCategory(feedback.getCategory());

        return feedbackRepository.save(existing);
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
