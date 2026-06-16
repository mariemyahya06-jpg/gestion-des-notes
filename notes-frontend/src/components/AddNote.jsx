function AddNote({ form, handleChange, handleSubmit }) {
  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Ajouter une note</h2>

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
        <button type="submit">Ajouter</button>
      </div>
    </form>
  )
}

export default AddNote