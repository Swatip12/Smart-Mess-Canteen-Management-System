package com.smartmess.smart_mess_management.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.SubscriptionService;
import com.smartmess.smart_mess_management.entity.Payment;
import com.smartmess.smart_mess_management.entity.Subscription;
import com.smartmess.smart_mess_management.repository.MessRepository;
import com.smartmess.smart_mess_management.repository.PaymentRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;
import com.smartmess.smart_mess_management.repository.SubscriptionRepository;

import enums.PaymentStatus;
import enums.PaymentType;
import enums.SubscriptionStatus;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final StudentRepository studentRepository;
    private final MessRepository messRepository;
    private final PaymentRepository paymentRepository;

    public SubscriptionServiceImpl(
            SubscriptionRepository subscriptionRepository,
            StudentRepository studentRepository,
            MessRepository messRepository,
            PaymentRepository paymentRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.studentRepository = studentRepository;
        this.messRepository = messRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Subscription createSubscription(Subscription subscription) {
        Long sId = subscription.getStudentId();
        if (sId == null && subscription.getStudent() != null) {
            sId = subscription.getStudent().getId();
        }
        if (sId != null) {
            studentRepository.findById(sId).ifPresent(subscription::setStudent);
        }

        Long mId = subscription.getMessId();
        if (mId == null && subscription.getMess() != null) {
            mId = subscription.getMess().getId();
        }
        if (mId != null) {
            messRepository.findById(mId).ifPresent(subscription::setMess);
        }

        if (subscription.getStartDate() == null) {
            subscription.setStartDate(LocalDate.now());
        }
        if (subscription.getStatus() == null) {
            subscription.setStatus(SubscriptionStatus.ACTIVE);
        }

        Subscription savedSubscription = subscriptionRepository.save(subscription);

        // Auto-generate Payment transaction for subscription
        try {
            if (savedSubscription.getAmount() != null) {
                Payment payment = Payment.builder()
                        .student(savedSubscription.getStudent())
                        .amount(savedSubscription.getAmount())
                        .type(PaymentType.SUBSCRIPTION)
                        .status(PaymentStatus.COMPLETED)
                        .paymentMethod("UPI")
                        .transactionId("TXN-SUB-" + savedSubscription.getId() + "-" + System.currentTimeMillis())
                        .build();
                paymentRepository.save(payment);
            }
        } catch (Exception e) {
            System.err.println("Warning: Auto-payment generation for subscription skipped: " + e.getMessage());
        }

        return savedSubscription;
    }

    @Override
    public Subscription getSubscriptionById(Long id) {
        return subscriptionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Subscription not found with id: " + id));
    }

    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    @Override
    public Subscription updateSubscription(Long id, Subscription subscription) {

        Subscription existing = getSubscriptionById(id);

        if (subscription.getStudent() != null) {
            existing.setStudent(subscription.getStudent());
        } else if (subscription.getStudentId() != null) {
            studentRepository.findById(subscription.getStudentId()).ifPresent(existing::setStudent);
        }

        if (subscription.getMess() != null) {
            existing.setMess(subscription.getMess());
        } else if (subscription.getMessId() != null) {
            messRepository.findById(subscription.getMessId()).ifPresent(existing::setMess);
        }

        if (subscription.getPlan() != null) existing.setPlan(subscription.getPlan());
        if (subscription.getStartDate() != null) existing.setStartDate(subscription.getStartDate());
        if (subscription.getEndDate() != null) existing.setEndDate(subscription.getEndDate());
        if (subscription.getAmount() != null) existing.setAmount(subscription.getAmount());
        if (subscription.getStatus() != null) existing.setStatus(subscription.getStatus());

        return subscriptionRepository.save(existing);
    }

    @Override
    public void deleteSubscription(Long id) {
        subscriptionRepository.deleteById(id);
    }

    @Override
    public List<Subscription> getActiveSubscriptionsByStudent(Long studentId) {
        return subscriptionRepository.findByStudentIdAndStatus(
                studentId, SubscriptionStatus.ACTIVE);
    }

    @Override
    public boolean hasActiveSubscription(Long studentId, Long messId) {
        return subscriptionRepository.existsByStudentIdAndMessIdAndStatus(
                studentId, messId, SubscriptionStatus.ACTIVE);
    }
}
