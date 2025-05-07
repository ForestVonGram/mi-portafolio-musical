package com.davidgomez.miportafoliomusical.service;

import com.davidgomez.miportafoliomusical.model.Biografia;
import com.davidgomez.miportafoliomusical.repository.BiografiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BiografiaService {

     @Autowired
     private BiografiaRepository repository;

     public Optional<Biografia> getBiografia() {
         return repository.findById(1L);
     }

     public Biografia guardar(Biografia bio) {
         return repository.save(bio);
     }
}
