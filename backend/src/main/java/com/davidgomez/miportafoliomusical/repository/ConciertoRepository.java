package com.davidgomez.miportafoliomusical.repository;

import com.davidgomez.miportafoliomusical.model.Concierto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConciertoRepository extends JpaRepository<Concierto, Long> {
    List<Concierto> findAllByOrderByFechaDesc();
}
