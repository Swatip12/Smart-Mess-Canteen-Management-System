package com.smartmess.smart_mess_management.Services;

import java.util.List;
import com.smartmess.smart_mess_management.entity.SystemSetting;

public interface SystemSettingService {

    List<SystemSetting> getAllSettings();

    SystemSetting getByKey(String key);

    SystemSetting saveOrUpdate(String key, String value, String description, String category);

    void initDefaultSettings();
}
