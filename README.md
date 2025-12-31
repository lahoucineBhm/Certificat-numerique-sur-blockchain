#  Certificat numérique sur Blockchain (Ethereum)

Plateforme complète pour **émettre**, **vérifier** et **tracer** des certificats numériques (diplômes, attestations, formations) de manière **infalsifiable** grâce à la blockchain **Ethereum**.

> Idée clé : on n’enregistre pas le certificat complet on-chain, mais un **hash unique** (empreinte) qui permet de **prouver l’authenticité** du document à tout moment.

---

## 🎯 Objectif

Développer une application de certification numérique sécurisée sur Ethereum permettant :

- ✅ **Émission** d’un certificat avec un **hash unique**
- ✅ **Vérification** de l’authenticité d’un certificat
- ✅ **Historique** immuable des certificats émis (traçabilité)

---

## 🧰 Technologies

- **Ethereum / Solidity** (smart contract)
- **Remix IDE** (déploiement rapide du contrat)
- **MetaMask** (wallet + signature + interaction avec le réseau)
- **Python + Web3.py** (génération, émission et vérification des certificats)
- **react** (Frontend web pour faciliter l’usage côté utilisateur)

---

## 📁 Structure du projet

- `smart_contrat/` : smart contract Solidity (émission + vérification + historique) :contentReference[oaicite:1]{index=1}  
- `backend/` : scripts / API Python (Web3.py) pour émettre & vérifier :contentReference[oaicite:2]{index=2}  
- `frontend/` : interface web (facultatif selon ton implémentation) :contentReference[oaicite:3]{index=3}  

---

## ⚙️ Prérequis

- Python **3.9+**
- Node.js 
- Un wallet **MetaMask**
- Un réseau Ethereum de test recommandé : **akSync Sepolia**

---

## 🚀 Mise en route (Quick Start)

### 1) Ajouter zkSync Era Sepolia (Testnet) sur MetaMask

1. Ouvrir **MetaMask**
2. Aller dans **Paramètres** → **Réseaux** → **Ajouter un réseau**
3. Cliquer sur **Ajouter un réseau manuellement**
4. Renseigner les informations suivantes :

- **Nom du réseau** : zkSync Era Sepolia  
- **RPC URL** : https://sepolia.era.zksync.dev  
- **Chain ID** : 300  
- **Symbole** : ETH  
- **Explorateur de blocs** : https://sepolia.explorer.zksync.io  

5. Sauvegarder puis **sélectionner ce réseau** dans MetaMask

✅ MetaMask est maintenant connecté au **testnet zkSync Era Sepolia**.

---

### 2) Déployer le smart contract sur zkSync Era Sepolia (Remix + MetaMask)

> Objectif : déployer le smart contract Solidity sur **zkSync Era Sepolia (testnet)**.

#### Étapes

1. Ouvrir Remix IDE : https://remix.ethereum.org
2. Importer le fichier `.sol` depuis le dossier `smart_contrat/`
3. Aller dans l’onglet **Solidity Compiler**
   - Sélectionner une version compatible (ex : `0.8.x`)
   - Cliquer sur **Compile**
4. Aller dans l’onglet **Deploy & Run Transactions**
   - **Environment** : `Injected Provider - MetaMask`
   - Vérifier que MetaMask est bien sur **zkSync Era Sepolia**
5. Sélectionner le contrat à déployer
6. Cliquer sur **Deploy**
7. Confirmer la transaction dans MetaMask
8. Copier l’adresse du contrat déployé : `CONTRACT_ADDRESS`

🔍 Tu peux vérifier le déploiement sur l’explorateur :
https://sepolia.explorer.zksync.io

✅ À la fin de cette étape :
- le smart contract est déployé sur **zkSync Era Sepolia**
- tu disposes de son **adresse** et de son **ABI**

---

### 3) Configurer le backend Python (Web3.py)

La configuration du backend se fait via le fichier **`config.py`** situé dans le dossier `backend/`.

#### Fichier : `backend/config.py`

Exemple de configuration pour le **testnet zkSync Era Sepolia** :

```python
RPC_URL = "https://sepolia.era.zksync.dev"

PRIVATE_KEY = "TA_CLE_PRIVEE_METAMASK"
ACCOUNT_ADDRESS = "0xTON_ADRESSE"

CONTRACT_ADDRESS = "0xADRESSE_DU_CONTRAT"
