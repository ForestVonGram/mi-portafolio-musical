package com.davidgomez.miportafoliomusical.controller;

import com.davidgomez.miportafoliomusical.model.Concierto;
import com.davidgomez.miportafoliomusical.service.ConciertoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagen(@RequestParam("file")MultipartFile file) {
        try {
            String folder = System.getProperty("user.dir") + "/uploads/";
            File directory = new File(folder);
            if (!directory.exists()) directory.mkdirs();

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(folder + fileName);
            Files.write(path, file.getBytes());

            return ResponseEntity.ok("/uploads/" + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen");
        }
    }
}
