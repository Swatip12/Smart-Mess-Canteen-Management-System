package com.smartmess.smart_mess_management.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.smartmess.smart_mess_management.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
