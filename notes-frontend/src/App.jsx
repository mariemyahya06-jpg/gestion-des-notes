import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import AddNote from './components/AddNote'
import EditNote from './components/EditNote'
import NoteList from './components/NoteList'

// Adresse de l'API REST (back-end Spring Boot)
const API_URL = 'http://localhost:8080/api/notes'

function App() {
  // Liste des notes affichees dans le tableau
  const [notes, setNotes] = useState([])

  // Champs du formulaire
  const [form, setForm] = useState({
    etudiant: '',
    matiere: '',
    note: '',
    semestre: '',
  })

  // Si on modifie une note : on garde son id, sinon null (= ajout)
  const [editId, setEditId] = useState(null)

  // Texte de recherche
  const [query, setQuery] = useState('')

  // Message d'erreur affiche en cas de probleme de connexion
  const [error, setError] = useState('')

  // Charger toutes les notes
  const loadNotes = () => {
    axios
      .get(API_URL)
      .then((res) => {
        setNotes(res.data)
        setError('')
      })
      .catch(() =>
        setError('Impossible de contacter le serveur (back-end sur le port 8080 ?).')
      )
  }

  // Au demarrage, on charge les notes une seule fois
  useEffect(() => {
    loadNotes()
  }, [])

  // Mettre a jour les champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Ajouter ou modifier une note
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.etudiant || !form.matiere || form.note === '' || !form.semestre) {
      alert('Tous les champs sont obligatoires.')
      return
    }

    const data = { ...form, note: parseFloat(form.note) }

    if (editId === null) {
      axios
        .post(API_URL, data)
        .then(() => {
          loadNotes()
          resetForm()
        })
        .catch(() => setError("Erreur lors de l'ajout de la note."))
    } else {
      axios
        .put(`${API_URL}/${editId}`, data)
        .then(() => {
          loadNotes()
          resetForm()
        })
        .catch(() => setError('Erreur lors de la modification de la note.'))
    }
  }

  // Remplir le formulaire pour modifier une note
  const handleEdit = (note) => {
    setEditId(note.id)
    setForm({
      etudiant: note.etudiant,
      matiere: note.matiere,
      note: note.note,
      semestre: note.semestre,
    })
  }

  // Supprimer une note
  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette note ?')) {
      axios
        .delete(`${API_URL}/${id}`)
        .then(() => loadNotes())
        .catch(() => setError('Erreur lors de la suppression de la note.'))
    }
  }

  // Vider le formulaire
  const resetForm = () => {
    setEditId(null)
    setForm({ etudiant: '', matiere: '', note: '', semestre: '' })
  }

  // Rechercher par etudiant, matiere ou semestre
  const handleSearch = (e) => {
    e.preventDefault()

    axios
      .get(`${API_URL}/search`, { params: { q: query } })
      .then((res) => {
        setNotes(res.data)
        setError('')
      })
      .catch(() => setError('Erreur lors de la recherche.'))
  }

  // Reinitialiser la recherche
  const handleResetSearch = () => {
    setQuery('')
    loadNotes()
  }

  return (
    <div className="app">
      <h1>Groupe 10 - Gestion des notes</h1>

      <p className="subtitle">
        Application CRUD simple pour la gestion des notes des etudiants
      </p>

      {error && <p className="error">{error}</p>}

      {editId === null ? (
        <AddNote
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <EditNote
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />
      )}

      <NoteList
        notes={notes}
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        handleResetSearch={handleResetSearch}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App