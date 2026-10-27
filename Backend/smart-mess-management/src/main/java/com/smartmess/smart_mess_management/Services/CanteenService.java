package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.Canteen;

public interface CanteenService {

    Canteen createCanteen(Canteen canteen);

    Canteen getCanteenById(Long id);

    List<Canteen> getAllCanteens();

    Canteen updateCanteen(Long id, Canteen canteen);

    void deleteCanteen(Long id);
}