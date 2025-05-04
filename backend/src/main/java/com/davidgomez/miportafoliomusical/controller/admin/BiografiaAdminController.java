package com.davidgomez.miportafoliomusical.controller.admin;

import com.davidgomez.miportafoliomusical.model.Biografia;
import com.davidgomez.miportafoliomusical.service.BiografiaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/biografia")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BiografiaAdminController {

    private final BiografiaService service;

    @PostMapping
    public Biografia guardar(@RequestBody Biografia bio) {
        return service.guardar(bio);
    }
}
