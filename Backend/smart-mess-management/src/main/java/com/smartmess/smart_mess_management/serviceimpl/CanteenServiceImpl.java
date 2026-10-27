package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.CanteenService;
import com.smartmess.smart_mess_management.entity.Canteen;
import com.smartmess.smart_mess_management.repository.AdminRepository;
import com.smartmess.smart_mess_management.repository.CanteenRepository;

@Service
public class CanteenServiceImpl implements CanteenService {

    private final CanteenRepository canteenRepository;
    private final AdminRepository adminRepository;

    public CanteenServiceImpl(CanteenRepository canteenRepository, AdminRepository adminRepository) {
        this.canteenRepository = canteenRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public Canteen createCanteen(Canteen canteen) {
        if (canteen.getAdmin() == null && canteen.getAdminId() != null) {
            adminRepository.findById(canteen.getAdminId()).ifPresent(canteen::setAdmin);
        }
        if (canteen.getIsActive() == null) {
            canteen.setIsActive(true);
        }
        return canteenRepository.save(canteen);
    }

    @Override
    public Canteen getCanteenById(Long id) {
        return canteenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id: " + id));
    }

    @Override
    public List<Canteen> getAllCanteens() {
        return canteenRepository.findAll();
    }

    @Override
    public Canteen updateCanteen(Long id, Canteen canteen) {
        Canteen existing = getCanteenById(id);

        existing.setName(canteen.getName());
        existing.setLocation(canteen.getLocation());
        existing.setOpeningTime(canteen.getOpeningTime());
        existing.setClosingTime(canteen.getClosingTime());
        existing.setContactNumber(canteen.getContactNumber());
        if (canteen.getIsActive() != null) {
            existing.setIsActive(canteen.getIsActive());
        }

        if (canteen.getAdmin() != null) {
            existing.setAdmin(canteen.getAdmin());
        } else if (canteen.getAdminId() != null) {
            adminRepository.findById(canteen.getAdminId()).ifPresent(existing::setAdmin);
        }

        return canteenRepository.save(existing);
    }

    @Override
    public void deleteCanteen(Long id) {
        canteenRepository.deleteById(id);
    }
}
