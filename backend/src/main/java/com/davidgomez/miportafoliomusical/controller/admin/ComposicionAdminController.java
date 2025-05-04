package com.davidgomez.miportafoliomusical.controller.admin;

import com.davidgomez.miportafoliomusical.model.Composicion;
import com.davidgomez.miportafoliomusical.service.ComposicionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/composiciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ComposicionAdminController {

    private final ComposicionService service;

    @PostMapping
    public ResponseEntity<Composicion> guardar(@RequestBody Composicion composicion) {
        return ResponseEntity.ok(service.guardar(composicion));
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
