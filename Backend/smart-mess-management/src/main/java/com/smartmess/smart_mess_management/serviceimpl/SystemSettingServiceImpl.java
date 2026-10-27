package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import com.smartmess.smart_mess_management.Services.SystemSettingService;
import com.smartmess.smart_mess_management.entity.SystemSetting;
import com.smartmess.smart_mess_management.repository.SystemSettingRepository;

@Service
public class SystemSettingServiceImpl implements SystemSettingService {

    private final SystemSettingRepository systemSettingRepository;

    public SystemSettingServiceImpl(SystemSettingRepository systemSettingRepository) {
        this.systemSettingRepository = systemSettingRepository;
    }

    @PostConstruct
    public void init() {
        initDefaultSettings();
    }

    @Override
    public List<SystemSetting> getAllSettings() {
        return systemSettingRepository.findAll();
    }

    @Override
    public SystemSetting getByKey(String key) {
        return systemSettingRepository.findBySettingKey(key)
                .orElse(null);
    }

    @Override
    public SystemSetting saveOrUpdate(String key, String value, String description, String category) {
        SystemSetting setting = systemSettingRepository.findBySettingKey(key)
                .orElse(SystemSetting.builder().settingKey(key).build());

        setting.setSettingValue(value);
        if (description != null) setting.setDescription(description);
        if (category != null) setting.setCategory(category);

        return systemSettingRepository.save(setting);
    }

    @Override
    public void initDefaultSettings() {
        createIfNotExists("ORDER_CANCELLATION_MINUTES", "15", "Window in minutes within which student can cancel pending order", "ORDERS");
        createIfNotExists("TAX_PERCENTAGE", "5.0", "Applicable GST/VAT percentage on canteen orders", "BILLING");
        createIfNotExists("MESS_LATE_FEE", "100", "Fixed late payment fee for overdue subscriptions", "BILLING");
        createIfNotExists("GUEST_MEAL_RATE", "90", "Per-meal rate for guest dining", "GENERAL");
        createIfNotExists("MESS_FEEDBACK_MANDATORY", "false", "Require feedback before next subscription renewal", "GENERAL");
    }

    private void createIfNotExists(String key, String val, String desc, String cat) {
        if (systemSettingRepository.findBySettingKey(key).isEmpty()) {
            systemSettingRepository.save(SystemSetting.builder()
                    .settingKey(key)
                    .settingValue(val)
                    .description(desc)
                    .category(cat)
                    .build());
        }
    }
}
