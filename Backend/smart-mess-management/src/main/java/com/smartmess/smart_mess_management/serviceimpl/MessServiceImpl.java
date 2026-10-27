package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.MessService;
import com.smartmess.smart_mess_management.entity.Mess;
import com.smartmess.smart_mess_management.repository.AdminRepository;
import com.smartmess.smart_mess_management.repository.MessRepository;

@Service
public class MessServiceImpl implements MessService {

    private final MessRepository messRepository;
    private final AdminRepository adminRepository;

    public MessServiceImpl(MessRepository messRepository, AdminRepository adminRepository) {
        this.messRepository = messRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public Mess createMess(Mess mess) {
        if (mess.getAdmin() == null && mess.getAdminId() != null) {
            adminRepository.findById(mess.getAdminId()).ifPresent(mess::setAdmin);
        }
        return messRepository.save(mess);
    }

    @Override
    public Mess getMessById(Long id) {
        return messRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mess not found with id: " + id));
    }

    @Override
    public List<Mess> getAllMesses() {
        return messRepository.findAll();
    }

    @Override
    public Mess updateMess(Long id, Mess mess) {
        Mess existing = getMessById(id);

        existing.setName(mess.getName());
        existing.setLocation(mess.getLocation());
        existing.setContactNumber(mess.getContactNumber());
        existing.setCapacity(mess.getCapacity());
        existing.setType(mess.getType());

        if (mess.getAdmin() != null) {
            existing.setAdmin(mess.getAdmin());
        } else if (mess.getAdminId() != null) {
            adminRepository.findById(mess.getAdminId()).ifPresent(existing::setAdmin);
        }

        return messRepository.save(existing);
    }

    @Override
    public void deleteMess(Long id) {
        messRepository.deleteById(id);
    }
}
