import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

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
      .catch(() => setError("Impossible de contacter le serveur (back-end sur le port 8080 ?)."))
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

    // Verification simple
    if (!form.etudiant || !form.matiere || form.note === '' || !form.semestre) {
      alert('Tous les champs sont obligatoires.')
      return
    }

    const data = { ...form, note: parseFloat(form.note) }

    if (editId === null) {
      // Ajout (POST -> http://localhost:8080/api/notes)
      axios
        .post(API_URL, data)
        .then(() => {
          loadNotes()
          resetForm()
        })
        .catch(() => setError("Erreur lors de l'ajout de la note."))
    } else {
      // Modification (PUT)
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

      {/* Message d'erreur (affiche seulement s'il y a une erreur) */}
      {error && <p className="error">{error}</p>}

      {/* Formulaire d'ajout / modification */}
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>{editId === null ? 'Ajouter une note' : 'Modifier la note'}</h2>
        <input
          name="etudiant"
          placeholder="Etudiant"
          value={form.etudiant}
          onChange={handleChange}
        />
        <input
          name="matiere"
          placeholder="Matiere"
          value={form.matiere}
          onChange={handleChange}
        />
        <input
          name="note"
          type="number"
          step="0.01"
          min="0"
          max="20"
          placeholder="Note (0 - 20)"
          value={form.note}
          onChange={handleChange}
        />
        <input
          name="semestre"
          placeholder="Semestre"
          value={form.semestre}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit">
            {editId === null ? 'Ajouter' : 'Enregistrer'}
          </button>
          {editId !== null && (
            <button type="button" className="btn-grey" onClick={resetForm}>
              Annuler
            </button>
          )}
        </div>
      </form>

      {/* Barre de recherche */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          placeholder="Rechercher par etudiant, matiere ou semestre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Rechercher</button>
        <button type="button" className="btn-grey" onClick={handleResetSearch}>
          Reinitialiser
        </button>
      </form>

      {/* Tableau des notes */}
      <table className="notes-table">
        <thead>
          <tr>
            <th>Etudiant</th>
            <th>Matiere</th>
            <th>Note</th>
            <th>Semestre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">Aucune note trouvee.</td>
            </tr>
          ) : (
            notes.map((n) => (
              <tr key={n.id}>
                <td>{n.etudiant}</td>
                <td>{n.matiere}</td>
                <td>{n.note}</td>
                <td>{n.semestre}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(n)}>
                    Modifier
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(n.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
