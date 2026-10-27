package com.smartmess.smart_mess_management.Services;


import java.time.LocalDate;
import java.util.List;

import com.smartmess.smart_mess_management.entity.Menu;

public interface MenuService {

    Menu createMenu(Menu menu);

    Menu getMenuById(Long id);

    List<Menu> getAllMenus();

    Menu updateMenu(Long id, Menu menu);

    void deleteMenu(Long id);

    List<Menu> getMenuByMessAndDate(Long messId, LocalDate date);
}