package com.davidgomez.miportafoliomusical.controller;

import com.davidgomez.miportafoliomusical.model.Biografia;
import com.davidgomez.miportafoliomusical.service.BiografiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/biografia")
public class BiografiaController {

    @Autowired
    private BiografiaService service;

    @GetMapping
    public Biografia obtener() {
        return service.getBiografia().orElse(null);
    }

    @PostMapping
    public Biografia guardar(@RequestBody Biografia bio) {
        return service.guardar(bio);
    }
}
