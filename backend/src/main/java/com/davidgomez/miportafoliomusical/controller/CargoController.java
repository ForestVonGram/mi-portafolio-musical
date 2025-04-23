package com.davidgomez.miportafoliomusical.controller;

import com.davidgomez.miportafoliomusical.model.Cargo;
import com.davidgomez.miportafoliomusical.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/cargos")
public class CargoController {

    @Autowired
    private CargoService service;

    @GetMapping
    public List<Cargo> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Cargo obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id).orElse(null);
    }

    @PostMapping
    public Cargo guardar(@RequestBody Cargo cargo) {
        return service.guardar(cargo);
    }

    @PutMapping("/{id}")
    public Cargo actualizar(@PathVariable Long id, @RequestBody Cargo actualizado) {
        actualizado.setId(id);
        return service.guardar(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
