package com.smartmess.smart_mess_management.Services;



import java.util.List;

import com.smartmess.smart_mess_management.entity.Complaint;
import enums.ComplaintStatus;

public interface ComplaintService {

    Complaint createComplaint(Complaint complaint);

    Complaint getComplaintById(Long id);

    List<Complaint> getAllComplaints();

    Complaint updateComplaint(Long id, Complaint complaint);

    void deleteComplaint(Long id);

    List<Complaint> getComplaintsByStatus(ComplaintStatus status);

    Complaint resolveComplaint(Long complaintId, String resolution);
}