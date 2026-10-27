package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.NoticeService;
import com.smartmess.smart_mess_management.entity.Notice;

import enums.NoticeType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @PostMapping
    public ResponseEntity<Notice> create(
            @RequestBody Notice notice) {

        return ResponseEntity.ok(
                noticeService.createNotice(notice));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                noticeService.getNoticeById(id));
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAll() {

        return ResponseEntity.ok(
                noticeService.getAllNotices());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notice> update(
            @PathVariable Long id,
            @RequestBody Notice notice) {

        return ResponseEntity.ok(
                noticeService.updateNotice(id, notice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        noticeService.deleteNotice(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<Notice>> getActiveNotices() {

        return ResponseEntity.ok(
                noticeService.getActiveNotices());
    }

    @GetMapping("/type")
    public ResponseEntity<List<Notice>> getByType(
            @RequestParam NoticeType type) {

        return ResponseEntity.ok(
                noticeService.getNoticesByType(type));
    }
}