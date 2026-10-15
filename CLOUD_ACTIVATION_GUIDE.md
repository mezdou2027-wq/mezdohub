# MezdoHub — Supabase Cloud Production Activation Guide
**Document Version:** 1.0.0  
**Author:** Chief Technology Officer (CTO), MezdoHub  
**Target Audience:** MezdoHub Platform Owner & Administrators  
**Purpose:** Step-by-step, beginner-friendly instructions to activate live Supabase PostgreSQL production infrastructure.  

---

## 1. Overview: What Does Activating Supabase Mean?

Right now, MezdoHub operates in a resilient **hybrid sandbox mode** — your demo accounts, calculators, and CV builders work smoothly. 

Activating Supabase connects MezdoHub to an enterprise-grade, cloud-hosted **PostgreSQL database**. This allows:
* Candidates to create permanent accounts from their phones or laptops.
* Resumes and job applications to be securely stored in the cloud.
* Real-time notifications and encrypted database records.
* Complete compliance with Moroccan privacy standards (CNDP Law 09-08).

The whole setup takes **less than 6 minutes** and requires **zero programming knowledge**.

---

## 2. Step 1: Create Your Free Supabase Project

1. Open your web browser and go to [https://supabase.com](https://supabase.com).
2. Click **Start your project** (or **Sign In**) in the top-right corner.
3. Sign in using your **GitHub account** or your **Google email** (`mezdou2027@gmail.com`).
4. Once inside your dashboard, click the green button labeled **New Project**.
5. Fill in the project details:
   * **Name:** `MezdoHub-Production`
   * **Database Password:** Enter a strong password (or click *Generate a password*). **Important:** Copy and save this password in a safe place (like a password manager or secure note).
   * **Pricing Plan:** Select **Free Plan** (0$/month — includes 500MB database, 50,000 monthly active users, and 1GB file storage, perfectly sized for launch).

---

## 3. Step 2: Choose the Optimal Cloud Region for Morocco 🇲🇦

Under the **Region** dropdown during project creation, select:

> **Recommended Region:** `EU (Frankfurt) - eu-central-1` or `EU (Paris) - eu-west-3`

### Why this matters for Moroccan users:
Morocco's primary international undersea telecommunications cables connect directly to France, Spain, and Germany. Selecting Frankfurt or Paris guarantees:
* **Lowest Latency (25ms - 45ms):** Pages, jobs, and candidate dashboards load instantaneously for users in Tangier, Casablanca, Rabat, and all Moroccan regions.
* **Moroccan CNDP & GDPR Compliance:** European cloud data centers comply with strict international data protection laws recognized by Morocco.

Click **Create new project**. Supabase will set up your database in about **90 seconds**.

---

## 4. Step 3: Obtain Your SUPABASE_URL and SUPABASE_ANON_KEY

Once your project is created and says **Active**:

1. In the left-hand navigation sidebar, click on the **Settings** gear icon (⚙️) at the very bottom.
2. Under the Settings menu, click on **API** (or **Data API**).
3. On the API Settings screen, you will see two critical values:
   * **Project URL:** Looks like `https://abcdefghijklmnop.supabase.co`. Copy this value.
   * **Project API Keys -> `anon` / `public`:** A long key starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...`. Copy this value.

> ⚠️ **Security Warning:** Never share your `service_role` key! Only copy the **`anon` (public)** key.

---

## 5. Step 4: Where to Place Your Environment Variables

To connect MezdoHub to your new cloud database:

1. In your project files, find the file named `.env.example` in the root folder.
2. Create or open the real `.env` file (or provide these values to your hosting settings on Cloud Run / Vercel / Netlify):
   ```env
   VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Save the file.
4. MezdoHub will automatically detect these credentials, transition out of mock mode, and start connecting live to your Supabase PostgreSQL database!

---

## 6. Step 5: Execute the 5 Migration Scripts (In Order)

MezdoHub includes 5 pre-written SQL scripts in the `SQL_MIGRATIONS/` folder that build all tables, security rules, and seed data automatically.

### How to run them in your Supabase Dashboard:

1. In the Supabase left-hand sidebar, click on the **SQL Editor** icon (`>_`).
2. Click the green button: **New query**.
3. Open the file `SQL_MIGRATIONS/001_initial_schema.sql` on your computer, select all text, copy it, and paste it into the Supabase SQL editor.
4. Click the green **Run** button (or press `Ctrl + Enter`). You should see: `Success. No rows returned`.
5. Repeat this exact process for the remaining scripts in order:
   * Paste and Run: `SQL_MIGRATIONS/002_indexes.sql` (Creates search indexes)
   * Paste and Run: `SQL_MIGRATIONS/003_rls.sql` (Enables military-grade Row-Level Security)
   * Paste and Run: `SQL_MIGRATIONS/004_audit_logs.sql` (Enables tamper-proof audit trails)
   * Paste and Run: `SQL_MIGRATIONS/005_seed_data.sql` (Adds Renault, Lear, and real Tangier job listings)

*That's it! Your entire database schema and security structure are now live.*

---

## 7. Step 6: Post-Deployment Validation (How to Verify It Worked)

In the Supabase SQL Editor, click **New query**, paste this verification check, and click **Run**:

```sql
SELECT 
    schemaname, 
    tablename, 
    rowsecurity AS rls_is_active 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

### What you should see:
You will see 7 tables, all with `rls_is_active = true`:
1. `applications` (Candidate job applications)
2. `candidates` (Candidate profiles and OFPPT diplomas)
3. `companies` (Renault, Lear, and employer accounts)
4. `jobs` (Job vacancies in Tangier and Morocco)
5. `notifications` (User notification inbox)
6. `profiles` (User identity records)
7. `resumes` (ATS resumes)

Next, click on **Table Editor** in the left sidebar, click on `jobs`, and you will see the pre-loaded jobs for **Renault Melloussa** and **Lear Corporation TFZ**.

---

## 8. Step 7: Automated Backups Setup

You do not need to worry about losing data:

1. **Daily Automatic Backups:** On the Supabase Free plan, automated database backups are enabled by default and stored for 7 days.
2. **On-Demand Manual Snapshot (Before Big Launches):**
   * Go to **Settings** -> **Database**.
   * Scroll down to **Database Backups**.
   * You can download or view automatic snapshots with one click.
3. **Point-In-Time Recovery (PITR):** When upgrading to the Supabase Pro plan ($25/mo), PITR allows you to restore your database to any specific second in the past 7 to 30 days.

---

## 9. Step 8: Database Monitoring & Health Checks

Supabase provides built-in visual monitoring dashboards:

1. **System Health:** In the left sidebar, click **Reports** (chart icon).
   * **Database Health:** Shows CPU usage, memory, and active connections.
   * **API Requests:** Shows how many candidates and employers visit MezdoHub each hour.
   * **Storage Usage:** Shows total PDF resumes uploaded.
2. **Slow Query Detector:** Go to **Database** -> **Query Performance** to see any queries taking longer than 100 milliseconds and optimize them.

---

## 10. Step 9: Disaster Recovery Process

If an accidental deletion or corrupted update ever occurs:

### Scenario A: Clean Slate Reset (Re-run Migrations)
1. Go to the Supabase **SQL Editor**.
2. Copy and paste the contents of `SQL_MIGRATIONS/rollback_all.sql`.
3. Click **Run**. All tables and triggers will be safely wiped clean.
4. Re-run scripts `001` through `005` in order.

### Scenario B: Restoring from Cloud Backup
1. Go to **Settings** -> **Database Backups**.
2. Select the snapshot from yesterday or this morning.
3. Click **Restore**. Supabase rolls back the database within 2 to 4 minutes without touching your front-end code.

---

## 11. Congratulations! Your MezdoHub Database is Cloud-Ready

You now have a production-grade, enterprise-hardened PostgreSQL database with Moroccan data privacy compliance, automated audit logging, and Row-Level Security.

Whenever you are ready to start **Phase 3 (Candidate Accounts & Self-Service Portal)**, let the engineering team know! 🚀
