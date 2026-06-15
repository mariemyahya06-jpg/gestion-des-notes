package com.gestion.notes.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom de l'etudiant est obligatoire")
    private String etudiant;

    @NotBlank(message = "La matiere est obligatoire")
    private String matiere;

    @NotNull(message = "La note est obligatoire")
    @DecimalMin(value = "0.0", message = "La note doit etre >= 0")
    @DecimalMax(value = "20.0", message = "La note doit etre <= 20")
    private Double note;

    @NotBlank(message = "Le semestre est obligatoire")
    private String semestre;

    public Note() {
    }

    public Note(String etudiant, String matiere, Double note, String semestre) {
        this.etudiant = etudiant;
        this.matiere = matiere;
        this.note = note;
        this.semestre = semestre;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEtudiant() { return etudiant; }
    public void setEtudiant(String etudiant) { this.etudiant = etudiant; }

    public String getMatiere() { return matiere; }
    public void setMatiere(String matiere) { this.matiere = matiere; }

    public Double getNote() { return note; }
    public void setNote(Double note) { this.note = note; }

    public String getSemestre() { return semestre; }
    public void setSemestre(String semestre) { this.semestre = semestre; }
}
