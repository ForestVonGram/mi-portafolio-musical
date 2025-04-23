package com.davidgomez.miportafoliomusical.service;

import com.davidgomez.miportafoliomusical.model.Composicion;
import com.davidgomez.miportafoliomusical.repository.ComposicionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComposicionService {

    private final ComposicionRepository repository;

    public List<Composicion> listar() {
        return repository.findAll();
    }

    public Composicion guardar(Composicion composicion) {
        return repository.save(composicion);
    }

    public Optional<Composicion> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
