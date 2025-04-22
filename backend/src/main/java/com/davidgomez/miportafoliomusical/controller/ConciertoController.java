package com.davidgomez.miportafoliomusical.controller;

import com.davidgomez.miportafoliomusical.model.Concierto;
import com.davidgomez.miportafoliomusical.service.ConciertoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conciertos")
@CrossOrigin(origins = "http://localhost:5173")
public class ConciertoController {

    @Autowired
    private ConciertoService service;

    @GetMapping
    public List<Concierto> listar() {
        return service.listar();
    }

    @PostMapping
    public Concierto guardar(@RequestBody Concierto concierto) {
        return service.guardar(concierto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Concierto> obtener(@PathVariable Long id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @GetMapping("/pasados")
    public List<Concierto> conciertosPasados() {
        return service.obtenerPasados();
    }

    @GetMapping("/proximos")
    public List<Concierto> conciertosProximos() {
        return service.obtenerProximos();
    }
}
