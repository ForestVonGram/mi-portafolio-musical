package com.davidgomez.miportafoliomusical.service;

import com.davidgomez.miportafoliomusical.model.Concierto;
import com.davidgomez.miportafoliomusical.repository.ConciertoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ConciertoService {

    @Autowired
    private ConciertoRepository repository;

    public List<Concierto> listar() {
        return repository.findAllByOrderByFechaDesc();
    }

    public Concierto guardar(Concierto concierto) {
        return repository.save(concierto);
    }

    public Optional<Concierto> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public List<Concierto> obtenerPasados() {
        return repository.findAll().stream()
                .filter(c -> c.getFecha().isBefore(LocalDate.now()))
                .toList();
    }

    public List<Concierto> obtenerProximos() {
        return repository.findAll().stream()
                .filter(c -> !c.getFecha().isBefore(LocalDate.now()))
                .toList();
    }
}
