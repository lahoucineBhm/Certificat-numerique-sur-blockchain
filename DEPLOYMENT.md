# 🚀 Guide de Déploiement

Ce guide explique comment déployer le projet en excluant les fichiers de configuration sensibles.

## ⚠️ Fichiers Sensibles Exclus du Déploiement

Les fichiers suivants ne doivent **JAMAIS** être committé dans le repository :

- `backend/config.py` - Contient les clés privées blockchain
- `.env` - Fichier d'environnement avec secrets

## 📝 Configuration pour le Déploiement

### 1. Cloner le repository
```bash
git clone <votre-repo>
cd mini-projet
```

### 2. Créer la configuration backend

**Option A : Utiliser config.py**
```bash
cd backend
cp config.example.py config.py
```

Puis éditer `config.py` et ajouter vos vraies valeurs :
```python
RPC_URL = "votre_rpc_url"
PRIVATE_KEY = "votre_clé_privée"
ACCOUNT_ADDRESS = "0xVotreAdresse"
CONTRACT_ADDRESS = "0xVotreContrat"
```

**Option B : Utiliser des variables d'environnement**
```bash
cd backend
cp .env.example .env
```

Éditer `.env` avec vos vraies valeurs.

### 3. Installer les dépendances Backend

```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Créer le requirements.txt (s'il n'existe pas)

```bash
pip freeze > requirements.txt
```

Ou créer manuellement avec :
```
Flask==2.3.0
Flask-CORS==4.0.0
web3==6.0.0
python-dotenv==1.0.0
```

### 5. Installer les dépendances Frontend

```bash
cd ../frontend
npm install
```

### 6. Créer le fichier .env Frontend (optionnel)

```bash
cp .env.example .env.local
```

Éditer `.env.local` :
```
REACT_APP_API_URL=http://localhost:5000
```

## 🔒 Vérifier l'Exclusion

Avant de déployer, vérifier que `config.py` est bien exclu :

```bash
# Vérifier le .gitignore
cat .gitignore

# Voir l'état des fichiers Git
git status

# S'assurer que config.py n'est pas stagé
git check-ignore backend/config.py  # Doit retourner le chemin
```

## 🌐 Déploiement en Production

### Sur un serveur

```bash
# 1. Clone du repo (sans config.py)
git clone <votre-repo>
cd mini-projet

# 2. Configuration
cp backend/config.example.py backend/config.py
# Éditer avec les vraies valeurs

# 3. Installation
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Lancer le backend
python app.py

# 5. Dans un autre terminal - Frontend
cd frontend
npm install
npm run build
serve -s build
```

### Avec Docker (optionnel)

**Dockerfile Backend**
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .

# Ne pas copier config.py - utiliser les variables d'environnement
ENV FLASK_APP=app.py
ENV PYTHONUNBUFFERED=1

EXPOSE 5000
CMD ["python", "app.py"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      RPC_URL: ${RPC_URL}
      PRIVATE_KEY: ${PRIVATE_KEY}
      ACCOUNT_ADDRESS: ${ACCOUNT_ADDRESS}
      CONTRACT_ADDRESS: ${CONTRACT_ADDRESS}
    volumes:
      - .:/app

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:5000
```

Lancer avec :
```bash
docker-compose up
```

## ✅ Checklist de Déploiement

- [ ] Cloner le repository
- [ ] Créer `backend/config.py` depuis `config.example.py`
- [ ] Remplir les vraies valeurs (clés, adresses)
- [ ] Vérifier que `config.py` est dans `.gitignore`
- [ ] Créer l'environnement virtuel Python
- [ ] Installer les dépendances Backend
- [ ] Installer les dépendances Frontend
- [ ] Tester le Backend : `python app.py`
- [ ] Tester le Frontend : `npm start`
- [ ] Vérifier la connexion Frontend/Backend
- [ ] Tester l'émission d'un certificat
- [ ] Tester la vérification d'un certificat

## 🆘 Dépannage

### Erreur : "config.py not found"
```bash
cp backend/config.example.py backend/config.py
# Puis éditer avec les vraies valeurs
```

### Erreur de connexion blockchain
Vérifier que `RPC_URL`, `PRIVATE_KEY`, `CONTRACT_ADDRESS` sont corrects dans `config.py`

### Port 5000/3000 déjà utilisé
```bash
# Changer le port dans config.py ou utiliser :
python app.py --port 5001
```

## 📚 Ressources

- [Web3.py Documentation](https://web3py.readthedocs.io/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Solidity Documentation](https://docs.soliditylang.org/)

---

**Besoin d'aide ?** Créer une issue sur le repository.
