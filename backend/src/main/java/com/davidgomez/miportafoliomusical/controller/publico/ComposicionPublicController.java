package com.davidgomez.miportafoliomusical.controller.publico;

import com.davidgomez.miportafoliomusical.model.Composicion;
import com.davidgomez.miportafoliomusical.service.ComposicionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/composiciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ComposicionPublicController {

    private final ComposicionService service;

    @GetMapping
    public List<Composicion> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Composicion> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
