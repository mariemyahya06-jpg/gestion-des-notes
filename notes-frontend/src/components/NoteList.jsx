function NoteList({
  notes,
  query,
  setQuery,
  handleSearch,
  handleResetSearch,
  handleEdit,
  handleDelete,
}) {
  return (
    <>
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
              <td colSpan="5" className="empty">
                Aucune note trouvee.
              </td>
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

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(n.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

export default NoteList