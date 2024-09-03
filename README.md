# Ambiance - E-handelsprojekt

## Innehållsförteckning

- [Projektbeskrivning](#rojektbeskrivning)
- [Tekniker](#tekniker)
- [Krav](#krav)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Användning](#användning)

## Projektbeskrivning:

Ambiance är ett E-handelsprojekt som utvecklats inom ramen för studier inom webbutveckling. Syftet med projektet är att skapa en användarvänlig och funktionell E-handelsplattform för att demonstrera kunskaper inom modern webbutveckling.
[Mer information om projektet](ambiance/README.md)

## Tekniker

- [Next.js](https://nextjs.org/) 
- [TypeScript](https://www.typescriptlang.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Mongoose](https://mongoosejs.com/) 
- [NextAuth.js](https://next-auth.js.org/) 
- [Mantine](https://mantine.dev/) 

## Krav

Specificera alla förutsättningar som användaren måste uppfylla för att kunna köra ditt projekt.

## Installation

1. Klona projektet från GitHub:

```bash
git clone https://github.com/allingers/ecommerce-ambiance
```

2. Navigera till projektmappen:

```bash
cd ambiance
```

3. Installera beroenden:

```bash
npm install
```

## Konfiguration

Skapa en .env.local-fil i rotmappen och fyll i följande uppgifter:

```bash
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your-mongodb-uri
MONGODB_DB=your-mongodb-database-name
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
JWT_SECRET=
```

## Användning

Starta projektet lokalt:

```bash
npm run dev
```

Navigera till http://localhost:3000 i din webbläsare.
