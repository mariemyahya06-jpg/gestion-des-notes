# Groupe 10 - Gestion des notes

Application web complete de type **CRUD** pour la gestion des notes des etudiants.
Chaque note contient : `etudiant`, `matiere`, `note` (0 a 20) et `semestre`.

## Technologies utilisees

- **Front-end** : React + Vite
- **Back-end** : Spring Boot
- **Base de donnees** : H2 Database (en memoire)
- **Communication** : API REST (avec axios cote front-end)

## Fonctionnalites de l'application

- Afficher la liste des notes
- Ajouter une nouvelle note
- Modifier une note existante
- Supprimer une note
- Rechercher une note par etudiant, matiere ou semestre

## Structure du projet

```
Gestion-des-notes/
├── notes-backend/    (Spring Boot + H2)
└── notes-frontend/   (React + Vite)
```

## Lancer le back-end

```bash
cd notes-backend
.\mvnw.cmd spring-boot:run
```

Le back-end demarre sur le port **8080**.

## Lancer le front-end

```bash
cd notes-frontend
npm run dev
```

Le front-end demarre sur le port **5173** (ou un autre port indique par Vite, ex : 5174).

> Important : le back-end et le front-end doivent etre lances en meme temps (dans deux terminaux differents).

## Liens

- **Back-end (API)** : http://localhost:8080/api/notes
- **Front-end** : http://localhost:5173 (ou le port affiche par Vite)
- **Console H2** : http://localhost:8080/h2-console

## API REST (routes)

| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/api/notes` | Recuperer toutes les notes |
| GET | `/api/notes/{id}` | Recuperer une note par son id |
| GET | `/api/notes/search?q=...` | Rechercher par etudiant, matiere ou semestre |
| POST | `/api/notes` | Ajouter une nouvelle note |
| PUT | `/api/notes/{id}` | Modifier une note existante |
| DELETE | `/api/notes/{id}` | Supprimer une note |

### Exemple de note (JSON)

```json
{
  "etudiant": "Ali",
  "matiere": "Mathematiques",
  "note": 15.5,
  "semestre": "S1"
}
```
