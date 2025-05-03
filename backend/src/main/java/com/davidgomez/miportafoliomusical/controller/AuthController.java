package com.davidgomez.miportafoliomusical.controller;

import com.davidgomez.miportafoliomusical.dto.AuthRequest;
import com.davidgomez.miportafoliomusical.dto.AuthResponse;
import com.davidgomez.miportafoliomusical.model.Usuario;
import com.davidgomez.miportafoliomusical.security.JwtUtil;
import com.davidgomez.miportafoliomusical.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        Optional<Usuario> userOpt = usuarioService.findByUsername(request.getUsername());
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            // Credenciales inválidas → 401
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Credenciales inválidas"));
        }

        String token = jwtUtil.generateToken(request.getUsername());
        // Credenciales válidas → 200 con token
        return ResponseEntity.ok(new AuthResponse(token));
    }
}