package com.smartmess.smart_mess_management.Services;


import java.util.List;

import com.smartmess.smart_mess_management.entity.Subscription;

public interface SubscriptionService {

    Subscription createSubscription(Subscription subscription);

    Subscription getSubscriptionById(Long id);

    List<Subscription> getAllSubscriptions();

    Subscription updateSubscription(Long id, Subscription subscription);

    void deleteSubscription(Long id);

    List<Subscription> getActiveSubscriptionsByStudent(Long studentId);

    boolean hasActiveSubscription(Long studentId, Long messId);
}