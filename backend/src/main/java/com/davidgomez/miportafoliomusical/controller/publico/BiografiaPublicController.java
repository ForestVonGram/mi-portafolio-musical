package com.davidgomez.miportafoliomusical.controller.publico;

import com.davidgomez.miportafoliomusical.model.Biografia;
import com.davidgomez.miportafoliomusical.service.BiografiaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/biografia")
@RequiredArgsConstructor
public class BiografiaPublicController {

    private BiografiaService service;

    @GetMapping
    public Biografia obtener() {
        return service.getBiografia().orElse(null);
    }
}
