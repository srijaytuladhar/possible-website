# Possible Health — Admin Portal (Angular)

A dedicated, standalone Angular management portal built for **Possible Health**, connected to Supabase PostgreSQL with full CRUD operations, JWT authentication, and real-time dashboard analytics.

---

## 🚀 Quick Start

### 1. Start the Backend API & Public Website (Next.js)
From the project root:
```bash
npm run dev
```
- Public website: [http://localhost:3000](http://localhost:3000)
- Backend REST API: [http://localhost:3000/api](http://localhost:3000/api)

### 2. Start the Angular Admin Portal
From the project root:
```bash
npm run admin:dev
```
Or directly from `admin-portal/`:
```bash
cd admin-portal
npm start
```
- Admin Portal: [http://localhost:4200](http://localhost:4200)

---

## 🔐 Credentials

- **Username**: `admin`
- **Password**: `Nepal@123#;` (or `Nepal@123#`)
- **Role**: `SUPER_ADMIN`

---

## 🗄️ Database Connection

The application is connected to the project's Supabase PostgreSQL instance:
```
postgresql://postgres.ovurdxjnnyliefzsecem:kVRtzHm339f2W2@aws-1-eu-central-1.pooler.supabase.com:5432/postgres
```
*(Automated IPv4 pooler fallback is embedded into `lib/db.ts` to seamlessly handle ISPs/environments lacking native IPv6 routes).*

To re-seed or verify tables:
```bash
npm run db:seed
```

---

## 🛠️ Management Features (Full CRUD)

| Module | Features |
|---|---|
| **Dashboard** | KPI statistics (Team, News, Publications, Inquiries, Donations), recent inquiries list, direct action links, Supabase live connection indicator. |
| **News & Articles** | List, create, edit, delete news articles, category filtering, search, featured toggling, publication date picker. |
| **Team Members** | List, search, filter by role (US Board, Nepal Board, Leadership/Staff, Advisors), create/edit members, order indexing, bios, social links. |
| **Publications** | Manage impact reports, research briefs, peer-reviewed papers, financials, disclosures, downloadable URLs, journal tags. |
| **Solutions & Projects** | Manage strategic pillars (Scale, Innovate, Test, Pipeline), metrics summary, objectives, partners, status. |
| **Contact Messages** | View public contact submissions, mark as read/replied, view message details, delete inquiries. |
| **Newsletter Subscribers** | View public newsletter subscribers, manage status (Active / Unsubscribed), export capability. |
| **Donations** | Overview of donor transactions, payment status, anonymous pledges, recurring donation flags. |
| **Site Settings** | Manage organization name, support emails, emergency phone numbers, social media links, maintenance mode. |

---

## 🏗️ Production Builds

- Build Angular Admin Portal:
  ```bash
  npm run admin:build
  ```
  Output: `admin-portal/dist/admin-portal/`

- Build Next.js Public Website & API:
  ```bash
  npm run build
  ```
