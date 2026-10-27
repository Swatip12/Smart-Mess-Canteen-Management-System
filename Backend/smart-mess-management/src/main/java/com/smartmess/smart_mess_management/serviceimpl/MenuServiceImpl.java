package com.smartmess.smart_mess_management.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.MenuService;
import com.smartmess.smart_mess_management.entity.Menu;
import com.smartmess.smart_mess_management.repository.MealRepository;
import com.smartmess.smart_mess_management.repository.MenuRepository;
import com.smartmess.smart_mess_management.repository.MessRepository;

@Service
public class MenuServiceImpl implements MenuService {

    private final MenuRepository menuRepository;
    private final MessRepository messRepository;
    private final MealRepository mealRepository;

    public MenuServiceImpl(
            MenuRepository menuRepository,
            MessRepository messRepository,
            MealRepository mealRepository) {
        this.menuRepository = menuRepository;
        this.messRepository = messRepository;
        this.mealRepository = mealRepository;
    }

    @Override
    public Menu createMenu(Menu menu) {
        Long mId = menu.getMessId();
        if (mId == null && menu.getMess() != null) {
            mId = menu.getMess().getId();
        }
        if (mId != null) {
            messRepository.findById(mId).ifPresent(menu::setMess);
        }

        Long mealId = menu.getMealId();
        if (mealId == null && menu.getMeal() != null) {
            mealId = menu.getMeal().getId();
        }
        if (mealId != null) {
            mealRepository.findById(mealId).ifPresent(menu::setMeal);
        }

        if (menu.getMenuDate() != null && menu.getDayOfWeek() == null) {
            menu.setDayOfWeek(menu.getMenuDate().getDayOfWeek());
        }
        return menuRepository.save(menu);
    }

    @Override
    public Menu getMenuById(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));
    }

    @Override
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    @Override
    public Menu updateMenu(Long id, Menu menu) {
        Menu existing = getMenuById(id);

        existing.setMenuDate(menu.getMenuDate());
        if (menu.getMenuDate() != null) {
            existing.setDayOfWeek(menu.getMenuDate().getDayOfWeek());
        }

        if (menu.getMess() != null) {
            existing.setMess(menu.getMess());
        } else if (menu.getMessId() != null) {
            messRepository.findById(menu.getMessId()).ifPresent(existing::setMess);
        }

        if (menu.getMeal() != null) {
            existing.setMeal(menu.getMeal());
        } else if (menu.getMealId() != null) {
            mealRepository.findById(menu.getMealId()).ifPresent(existing::setMeal);
        }

        existing.setItems(menu.getItems());

        return menuRepository.save(existing);
    }

    @Override
    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }

    @Override
    public List<Menu> getMenuByMessAndDate(Long messId, LocalDate date) {
        return menuRepository.findByMessIdAndMenuDate(messId, date);
    }
}
