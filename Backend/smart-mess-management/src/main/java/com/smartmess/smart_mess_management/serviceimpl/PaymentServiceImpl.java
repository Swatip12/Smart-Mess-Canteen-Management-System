package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.PaymentService;
import com.smartmess.smart_mess_management.entity.Payment;
import com.smartmess.smart_mess_management.repository.PaymentRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;

import enums.PaymentStatus;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final StudentRepository studentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public Payment createPayment(Payment payment) {
        if (payment.getStudent() == null && payment.getStudentId() != null) {
            studentRepository.findById(payment.getStudentId()).ifPresent(payment::setStudent);
        }
        if (payment.getStatus() == null) {
            payment.setStatus(PaymentStatus.COMPLETED);
        }
        if (payment.getTransactionId() == null || payment.getTransactionId().isBlank()) {
            payment.setTransactionId("TXN-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase());
        }
        if (payment.getPaymentMethod() == null) {
            payment.setPaymentMethod("ONLINE");
        }
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
