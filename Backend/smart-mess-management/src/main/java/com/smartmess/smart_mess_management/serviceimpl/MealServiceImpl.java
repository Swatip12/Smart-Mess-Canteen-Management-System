package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.MealService;
import com.smartmess.smart_mess_management.entity.Meal;
import com.smartmess.smart_mess_management.repository.MealRepository;
import com.smartmess.smart_mess_management.repository.MessRepository;

@Service
public class MealServiceImpl implements MealService {

    private final MealRepository mealRepository;
    private final MessRepository messRepository;

    public MealServiceImpl(MealRepository mealRepository, MessRepository messRepository) {
        this.mealRepository = mealRepository;
        this.messRepository = messRepository;
    }

    @Override
    public Meal createMeal(Meal meal) {
        Long mId = meal.getMessId();
        if (mId == null && meal.getMess() != null) {
            mId = meal.getMess().getId();
        }
        if (mId != null) {
            messRepository.findById(mId).ifPresent(meal::setMess);
        }
        return mealRepository.save(meal);
    }

    @Override
    public Meal getMealById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));
    }

    @Override
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @Override
    public Meal updateMeal(Long id, Meal meal) {
        Meal existing = getMealById(id);

        existing.setName(meal.getName());
        existing.setDescription(meal.getDescription());
        existing.setServeTime(meal.getServeTime());

        if (meal.getMess() != null) {
            existing.setMess(meal.getMess());
        } else if (meal.getMessId() != null) {
            messRepository.findById(meal.getMessId()).ifPresent(existing::setMess);
        }

        return mealRepository.save(existing);
    }

    @Override
    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }
}
