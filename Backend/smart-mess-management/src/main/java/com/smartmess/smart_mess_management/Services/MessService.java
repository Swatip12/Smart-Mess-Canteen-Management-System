package com.smartmess.smart_mess_management.Services;
import com.smartmess.smart_mess_management.entity.Mess;

import java.util.List;

public interface MessService {
    Mess createMess(Mess mess);
    Mess getMessById(Long id);
    List<Mess> getAllMesses();
    Mess updateMess(Long id, Mess mess);
    void deleteMess(Long id);
}