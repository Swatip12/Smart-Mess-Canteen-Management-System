package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.Notice;

import enums.NoticeType;

public interface NoticeService {

    Notice createNotice(Notice notice);

    Notice getNoticeById(Long id);

    List<Notice> getAllNotices();

    Notice updateNotice(Long id, Notice notice);

    void deleteNotice(Long id);

    List<Notice> getActiveNotices();

    List<Notice> getNoticesByType(NoticeType type);
}