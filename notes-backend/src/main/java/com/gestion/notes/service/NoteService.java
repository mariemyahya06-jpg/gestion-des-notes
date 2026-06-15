package com.gestion.notes.service;

import com.gestion.notes.model.Note;
import com.gestion.notes.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public Optional<Note> findById(Long id) {
        return noteRepository.findById(id);
    }

    public List<Note> search(String q) {
        if (q == null || q.isBlank()) {
            return noteRepository.findAll();
        }
        return noteRepository
                .findByEtudiantContainingIgnoreCaseOrMatiereContainingIgnoreCaseOrSemestreContainingIgnoreCase(q, q, q);
    }

    public Note create(Note note) {
        note.setId(null);
        return noteRepository.save(note);
    }

    public Optional<Note> update(Long id, Note details) {
        return noteRepository.findById(id).map(note -> {
            note.setEtudiant(details.getEtudiant());
            note.setMatiere(details.getMatiere());
            note.setNote(details.getNote());
            note.setSemestre(details.getSemestre());
            return noteRepository.save(note);
        });
    }

    public boolean delete(Long id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
