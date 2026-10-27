package com.smartmess.smart_mess_management.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.ComplaintService;
import com.smartmess.smart_mess_management.entity.Complaint;
import com.smartmess.smart_mess_management.repository.ComplaintRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;

import enums.ComplaintStatus;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final StudentRepository studentRepository;

    public ComplaintServiceImpl(ComplaintRepository complaintRepository, StudentRepository studentRepository) {
        this.complaintRepository = complaintRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public Complaint createComplaint(Complaint complaint) {
        Long sId = complaint.getStudentId();
        if (sId == null && complaint.getStudent() != null) {
            sId = complaint.getStudent().getId();
        }
        if (sId != null) {
            studentRepository.findById(sId).ifPresent(complaint::setStudent);
        }
        if (complaint.getStatus() == null) {
            complaint.setStatus(ComplaintStatus.OPEN);
        }
        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found with id: " + id));
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint updateComplaint(Long id, Complaint complaint) {

        Complaint existing = getComplaintById(id);

        if (complaint.getStudent() != null) {
            existing.setStudent(complaint.getStudent());
        } else if (complaint.getStudentId() != null) {
            studentRepository.findById(complaint.getStudentId()).ifPresent(existing::setStudent);
        }

        if (complaint.getTitle() != null) existing.setTitle(complaint.getTitle());
        if (complaint.getDescription() != null) existing.setDescription(complaint.getDescription());
        if (complaint.getStatus() != null) {
            existing.setStatus(complaint.getStatus());
            if (complaint.getStatus() == ComplaintStatus.RESOLVED || complaint.getStatus() == ComplaintStatus.CLOSED) {
                if (existing.getResolvedAt() == null) {
                    existing.setResolvedAt(LocalDateTime.now());
                }
            }
        }
        if (complaint.getCategory() != null) existing.setCategory(complaint.getCategory());
        if (complaint.getResolution() != null) existing.setResolution(complaint.getResolution());

        return complaintRepository.save(existing);
    }

    @Override
    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }

    @Override
    public List<Complaint> getComplaintsByStatus(ComplaintStatus status) {
        return complaintRepository.findByStatus(status);
    }

    @Override
    public Complaint resolveComplaint(Long complaintId, String resolution) {
        Complaint complaint = getComplaintById(complaintId);
        complaint.setStatus(ComplaintStatus.RESOLVED);
        complaint.setResolution(resolution);
        complaint.setResolvedAt(LocalDateTime.now());
        return complaintRepository.save(complaint);
    }
}
