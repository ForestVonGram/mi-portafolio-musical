package com.davidgomez.miportafoliomusical.controller.admin;

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
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/conciertos")
@CrossOrigin(origins = "http://localhost:5173")
public class ConciertoAdminController {

    @Autowired
    private ConciertoService service;

    @PostMapping
    public Concierto guardar(@RequestBody Concierto concierto) {
        return service.guardar(concierto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Concierto> actualizar(@PathVariable Long id, @RequestBody Concierto conciertoActualizado) {
        return service.obtenerPorId(id)
                .map(concierto -> {
                    concierto.setTitulo(conciertoActualizado.getTitulo());
                    concierto.setLugar(conciertoActualizado.getLugar());
                    concierto.setFecha(conciertoActualizado.getFecha());
                    concierto.setDescripcion(conciertoActualizado.getDescripcion());
                    concierto.setPortadaUrl(conciertoActualizado.getPortadaUrl());
                    Concierto actualizado = service.guardar(concierto);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagen(@RequestParam("file") MultipartFile file) {
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
