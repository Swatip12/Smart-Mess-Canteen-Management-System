package com.smartmess.smart_mess_management.repository;

import com.smartmess.smart_mess_management.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    @Query("SELECT m FROM Menu m WHERE m.mess.id = :messId AND m.menuDate = :date")
    List<Menu> findByMessIdAndMenuDate(@Param("messId") Long messId, @Param("date") LocalDate date);
}
