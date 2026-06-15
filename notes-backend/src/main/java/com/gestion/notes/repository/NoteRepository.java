package com.gestion.notes.repository;

import com.gestion.notes.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    // Recherche par etudiant, matiere ou semestre (insensible a la casse)
    List<Note> findByEtudiantContainingIgnoreCaseOrMatiereContainingIgnoreCaseOrSemestreContainingIgnoreCase(
            String etudiant,
            String matiere,
            String semestre);
}
