package com.davidgomez.miportafoliomusical.service;

import com.davidgomez.miportafoliomusical.model.Cargo;
import com.davidgomez.miportafoliomusical.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository repository;

    public List<Cargo> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Cargo> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Cargo guardar(Cargo cargo) {
        return repository.save(cargo);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
