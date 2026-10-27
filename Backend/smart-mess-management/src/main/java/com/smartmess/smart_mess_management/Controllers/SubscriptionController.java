package com.smartmess.smart_mess_management.Controllers;



import com.smartmess.smart_mess_management.Services.SubscriptionService;
import com.smartmess.smart_mess_management.entity.Subscription;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping
    public ResponseEntity<Subscription> create(
            @RequestBody Subscription subscription) {

        return ResponseEntity.ok(
                subscriptionService.createSubscription(subscription));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subscription> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                subscriptionService.getSubscriptionById(id));
    }

    @GetMapping
    public ResponseEntity<List<Subscription>> getAll() {
        return ResponseEntity.ok(
                subscriptionService.getAllSubscriptions());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }
}