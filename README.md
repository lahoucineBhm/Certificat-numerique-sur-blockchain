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
- (Optionnel) Frontend web pour faciliter l’usage côté utilisateur

---

## 📁 Structure du projet

- `smart_contrat/` : smart contract Solidity (émission + vérification + historique) :contentReference[oaicite:1]{index=1}  
- `backend/` : scripts / API Python (Web3.py) pour émettre & vérifier :contentReference[oaicite:2]{index=2}  
- `frontend/` : interface web (facultatif selon ton implémentation) :contentReference[oaicite:3]{index=3}  

---

## ⚙️ Prérequis

- Python **3.9+**
- Node.js (si ton `frontend/` l’utilise)
- Un wallet **MetaMask**
- Un réseau Ethereum de test recommandé : **Sepolia**
- Un RPC Provider (au choix) : **Infura / Alchemy / RPC public**

---

## 🚀 Mise en route (Quick Start)

### 1) Déployer le smart contract (Remix + MetaMask)

1. Ouvrir Remix : https://remix.ethereum.org
2. Importer le fichier `.sol` depuis `smart_contrat/`
3. Compiler le contrat
4. Onglet **Deploy & Run Transactions** :
   - Environment : **Injected Provider - MetaMask**
   - Réseau : **Sepolia** (ou ton réseau)
5. Déployer → récupérer l’adresse du contrat : `CONTRACT_ADDRESS`

✅ À la fin : tu as l’adresse du contrat + son ABI (Remix peut l’exporter).

---

### 2) Configurer le backend Python (Web3.py)

> Dans `backend/`, crée un fichier `.env` (ou adapte la config existante).

Exemple de variables :

```env
RPC_URL=https://sepolia.infura.io/v3/TON_INFURA_KEY
PRIVATE_KEY=TA_CLE_PRIVEE_METAMASK
ACCOUNT_ADDRESS=0xTON_ADRESSE
CONTRACT_ADDRESS=0xADRESSE_DU_CONTRAT
CHAIN_ID=11155111
