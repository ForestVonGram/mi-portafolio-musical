package com.davidgomez.miportafoliomusical.controller;

import com.davidgomez.miportafoliomusical.model.Composicion;
import com.davidgomez.miportafoliomusical.service.ComposicionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/composiciones")
@RequiredArgsConstructor
public class ComposicionController {

    private final ComposicionService service;

    @GetMapping
    public List<Composicion> listar() {
        return service.listar();
    }

    @PostMapping
    public ResponseEntity<Composicion> guardar(@RequestBody Composicion composicion) {
        return ResponseEntity.ok(service.guardar(composicion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Composicion> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

     @PutMapping("/{id}")
    public ResponseEntity<Composicion> actualizar(@PathVariable Long id, @RequestBody Composicion composicion) {
        return service.obtenerPorId(id)
                .map(c -> {
                    composicion.setId(id);
                    return ResponseEntity.ok(service.guardar(composicion));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
