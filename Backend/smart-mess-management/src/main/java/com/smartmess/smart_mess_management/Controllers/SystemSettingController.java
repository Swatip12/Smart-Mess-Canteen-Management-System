package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.SystemSettingService;
import com.smartmess.smart_mess_management.entity.SystemSetting;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "http://localhost:4200")
public class SystemSettingController {

    private final SystemSettingService systemSettingService;

    public SystemSettingController(SystemSettingService systemSettingService) {
        this.systemSettingService = systemSettingService;
    }

    @GetMapping
    public ResponseEntity<List<SystemSetting>> getAll() {
        return ResponseEntity.ok(systemSettingService.getAllSettings());
    }

    @GetMapping("/{key}")
    public ResponseEntity<SystemSetting> getByKey(@PathVariable String key) {
        SystemSetting setting = systemSettingService.getByKey(key);
        if (setting == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(setting);
    }

    @PostMapping
    public ResponseEntity<SystemSetting> update(@RequestBody Map<String, String> payload) {
        String key = payload.get("settingKey");
        String value = payload.get("settingValue");
        String desc = payload.get("description");
        String cat = payload.get("category");

        if (key == null || value == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(systemSettingService.saveOrUpdate(key, value, desc, cat));
    }
}
