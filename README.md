# 🌟 DKY Lifestyle

> **Crafted by Purpose.**

DKY Lifestyle est une plateforme web moderne développée avec **Next.js** qui regroupe plusieurs divisions sous une seule marque. Chaque division offre une expérience unique tout en partageant les mêmes valeurs : excellence, créativité et professionnalisme.

La première division disponible est **DKY Hair**, une plateforme complète de réservation et de gestion pour un salon de coiffure. À terme, DKY Lifestyle accueillera également **DKY Pastry**, **DKY Events**, **DKY Tech** et d'autres projets.

---

# 📖 Description

DKY Hair permet aux clientes de :

- Découvrir les différentes coiffures et services proposés
- Réserver un rendez-vous via un assistant de réservation intelligent
- Choisir des forfaits et services complémentaires
- Effectuer un dépôt sécurisé en ligne
- Suivre leurs réservations depuis leur espace client
- Acheter des produits capillaires dans la boutique

L'application comprend également un espace administrateur permettant de gérer entièrement l'entreprise sans modifier le code.

---

# 🚀 Technologies

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui

## Backend

- Next.js Server Actions
- Prisma ORM
- PostgreSQL (Neon)

## Authentification

- Clerk Authentication

## Paiement

- Stripe Checkout
- Stripe Webhooks

## Emails

- Resend

## Images

- Cloudinary

## Déploiement

- Vercel

---

# ✨ Fonctionnalités

## 🌐 Site public

- Landing page premium
- Présentation de DKY Lifestyle
- Galerie
- Catalogue des services
- Boutique
- FAQ
- Contact

---

## 💇 DKY Hair

### Collections

- Femmes
- Hommes
- Enfants

### Soins capillaires & Préparation

- Lavage
- Traitement hydratant
- Traitement protéiné
- Massage du cuir chevelu
- Dépose
- Démêlage
- Préparation avant coiffure

### Forfaits

- Essential
- Care
- Signature
- Prestige

### Boutique

- Mèches premium
- Bonnets satin
- Huiles
- Mousses
- Accessoires

---

## 📅 Réservation

- Wizard intelligent
- Réservation adaptative selon le service choisi
- Calcul automatique du prix
- Calcul automatique du dépôt (20%)
- Gestion des disponibilités
- Vérification des conflits de réservation
- Paiement Stripe
- Confirmation par email

---

## 👤 Espace client

- Authentification sécurisée
- Tableau de bord
- Historique des réservations
- Historique des commandes
- Recherche
- Filtres
- Modification du profil
- Réserver à nouveau
- Suivi des paiements

---

## ⚙️ Dashboard Administrateur

Gestion complète de :

- Services
- Forfaits
- Add-ons
- Produits
- Clients
- Réservations
- Commandes
- Disponibilités
- Images (Cloudinary)
- Utilisateurs
- Statistiques

---

# 📂 Structure du projet

```
app/
components/
lib/
prisma/
public/
actions/
hooks/
types/
```

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone https://github.com/USERNAME/dky-lifestyle.git

cd dky-lifestyle
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configurer les variables d'environnement

Créer un fichier :

```
.env
```

Puis ajouter :

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

RESEND_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 4. Générer Prisma

```bash
npx prisma generate
```

---

## 5. Lancer le projet

```bash
npm run dev
```

Le site sera disponible sur :

```
http://localhost:3000
```

---

# 🛣️ Feuille de route

- [x] Authentification Clerk
- [x] Dashboard administrateur
- [x] Réservation intelligente
- [x] Gestion des disponibilités
- [x] Paiement Stripe
- [x] Emails automatiques
- [x] Gestion des images avec Cloudinary
- [ ] DKY Pastry
- [ ] DKY Events
- [ ] DKY Tech

---

# 👩🏽‍💻 Développé par

**Dalia Ketchemen Yimga**

Baccalauréat en informatique – Université du Québec en Outaouais (UQO)

---

# 📜 Licence

Projet privé — Tous droits réservés © DKY Lifestyle.
