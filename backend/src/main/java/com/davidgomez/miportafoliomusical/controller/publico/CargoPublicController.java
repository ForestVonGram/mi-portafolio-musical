package com.davidgomez.miportafoliomusical.controller.publico;

import com.davidgomez.miportafoliomusical.model.Cargo;
import com.davidgomez.miportafoliomusical.service.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cargos")
@RequiredArgsConstructor
public class CargoPublicController {

    private CargoService service;

    @GetMapping
    public List<Cargo> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Cargo obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id).orElse(null);
    }
}
