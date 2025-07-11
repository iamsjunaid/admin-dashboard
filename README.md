# Admin Dashboard

Admin dashboard for managing car rental listings.

## Features

- User login
- View and manage listings
- Approve/reject listings
- Activity logs
- Mobile responsive

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React

## Setup

### Requirements

- Node.js 18+

### Install

```bash
git clone https://github.com/iamsjunaid/admin-dashboard.git
cd admin-dashboard
npm install
npm run dev
```

Open http://localhost:3000

### Login
- Email: `admin@example.com`
- Password: `password123`

## Structure

```
app/
├── api/                 # API routes
├── components/          # React components
├── dashboard/           # Dashboard page
└── ...
```

## API

- POST `/api/auth/login` - Login
- GET `/api/listings` - Get listings
- PUT `/api/listings/[id]` - Update listing
- GET `/api/audit-logs` - Get logs

## Screenshots
![alt text](Admin-Dashboard-07-11-2025_12_28_PM.png)
![alt text](<Admin-Dashboard-07-11-2025_12_28_PM (1).png>)
![alt text](Admin-Dashboard-07-11-2025_12_30_PM.png)
![alt text](Admin-Dashboard-07-11-2025_12_29_PM.png)

## Deploy

**Render:**
1. Push to GitHub
2. Create Web Service on render.com
3. Connect repository
4. Build: `npm run build`
5. Start: `npm start`

**Vercel:**
```bash
npm i -g vercel
vercel
```
