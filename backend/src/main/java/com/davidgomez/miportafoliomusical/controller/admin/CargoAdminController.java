package com.davidgomez.miportafoliomusical.controller.admin;

import com.davidgomez.miportafoliomusical.model.Cargo;
import com.davidgomez.miportafoliomusical.service.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/cargos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CargoAdminController {

    private final CargoService service;

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
