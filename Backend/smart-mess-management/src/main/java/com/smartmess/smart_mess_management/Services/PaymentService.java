package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.Payment;

public interface PaymentService {

    Payment createPayment(Payment payment);

    Payment getPaymentById(Long id);

    List<Payment> getAllPayments();

    void deletePayment(Long id);
}
