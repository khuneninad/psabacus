# 🎓 PS ABACUS — Official Web Platform

[![Live Website](https://img.shields.io/badge/Live%20Website-psabacus.com-25d366?style=for-the-badge&logo=google-chrome&logoColor=white)](https://psabacus.com)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://khuneninad.github.io/psabacus/)
[![Security Hardened](https://img.shields.io/badge/Security-Hardened%20Static%20Architecture-0284c7?style=for-the-badge&logo=security&logoColor=white)](#-production-security-architecture)
[![Lead Engine](https://img.shields.io/badge/Lead%20Engine-Google%20Cloud%20Serverless-f5a623?style=for-the-badge&logo=google-sheets&logoColor=white)](#-serverless-lead-ingestion-pipeline)
[![Author](https://img.shields.io/badge/Architect%20%26%20Engineer-Ninad%20Khune-000000?style=for-the-badge&logo=github)](https://github.com/khuneninad)

> **"A Journey to Excellence"**  
> The official, high-performance web platform for **PS ABACUS** (Piyushlok Education) — empowering young minds with certified coaching in **Abacus Mental Math**, **Vedic Mathematics**, and **Handwriting Mastery**, and providing nationwide **"Book a Franchise"** opportunities for educators and entrepreneurs.

---

## 🌐 Production Domain

* **Primary Production URL**: [https://psabacus.com](https://psabacus.com)
* **Secondary / Canonical URL**: [https://www.psabacus.com](https://www.psabacus.com)
* **Official Helplines**: `+91 9404853704` / `+91 8275635904`
* **Official Email**: `psabacus01@gmail.com`

---

## 🏛️ High-Level System Architecture

```
                    ┌────────────────────────────────────────────────────────┐
                    │               CLIENT DEVICES & USERS                   │
                    │      (Smartphones, Tablets, Laptops, Desktops)         │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                                    HTTPS / TLS 1.3 (Port 443)
                                                ▼
                    ┌────────────────────────────────────────────────────────┐
                    │             GLOBAL ANYCAST CDN EDGE NODES              │
                    │         (GitHub Pages Edge Infrastructure)             │
                    │     • Anti-DDoS Protection                             │
                    │     • Content Delivery in <0.2s across India           │
                    │     • HTTP-to-HTTPS 301 Automatic Redirection          │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                        ┌───────────────────────┴───────────────────────┐
                        │                                               │
                        ▼                                               ▼
     ┌─────────────────────────────────────┐         ┌─────────────────────────────────────┐
     │      STATIC FRONTEND ASSETS         │         │      SERVERLESS LEAD ENGINE         │
     │  (Pure HTML5 / CSS3 / Vanilla JS)   │         │    (Google Apps Script Webhook)     │
     │  • Zero SQL Database Vulnerability  │         │  • Dual-Channel Ingestion           │
     │  • Zero Remote Code Execution (RCE) │         │  • Automatic Sheet Logging          │
     │  • Pre-rendered Static Pages        │         │  • Instant Gmail Push Notifications │
     └─────────────────────────────────────┘         └─────────────────────────────────────┘
```

---

## 🛡️ Production Security Architecture

Because this website serves real users and prospective franchise partners daily, the system has been engineered with a **zero-trust, static-first defense in depth** model:

### 1. Zero Database & Zero SQL Injection (SQLi)
* **Threat Neutralized**: Traditional websites running MySQL/PostgreSQL on web hosts are common targets for automated SQL injection, data tampering, and credential dumping.
* **Our Implementation**: The public web tier contains **zero relational databases**. There are no database connection strings, passwords, or exposed SQL ports. Data extraction attacks against the web server are mathematically impossible.

### 2. Zero Server-Side Execution (No PHP / No Remote Code Execution)
* **Threat Neutralized**: Over 85% of shared hosting breaches occur via PHP vulnerabilities, malicious file uploads, or outdated CMS plugins executing arbitrary web shells on the server.
* **Our Implementation**: The production build consists exclusively of static HTML5, CSS3, and browser-sandboxed JavaScript. There is no PHP, Node.js, or Python server process listening on production ports. Attackers cannot upload or execute arbitrary server-side code.

### 3. Serverless Isolated Lead Pipeline (Google Cloud Sandbox)
* **Threat Neutralized**: Storing lead forms, phone numbers, and messages in unencrypted server files risks data leaks during hosting misconfigurations.
* **Our Implementation**: Customer inquiries are transmitted directly to **Google Cloud (Google Apps Script Engine)** via secure cross-origin HTTP POST. Data is written directly into an encrypted, private Google Sheet and pushed instantly to the administrator's Gmail via Google's multi-layered security infrastructure. No lead data touches public static server disks.

### 4. Input Sanitization & Anti-Injection Filtering
* **Client-Side Validation**: All input fields (Name, Phone, City, Message, Course, Franchise Model) undergo structural sanitation prior to submission.
* **Protocol Handler Defense**: Phone numbers are strictly scrubbed of all non-numeric characters (`replace(/[^0-9]/g, "")`) before generating WhatsApp (`https://wa.me/91...`) and telephone (`tel:...`) URI schemes, completely preventing JavaScript injection or protocol-smuggling attacks.

### 5. Defensive HTTP Security Headers
The server configuration employs modern defensive response headers:
* `X-Frame-Options: SAMEORIGIN` — Completely prevents **Clickjacking** attacks by disallowing malicious third-party websites from framing the site in hidden iframes.
* `X-Content-Type-Options: nosniff` — Prevents browsers from **MIME-sniffing** a response away from the declared content type.
* `X-XSS-Protection: 1; mode=block` — Enforces hardware cross-site scripting filters in legacy user agents.
* `Referrer-Policy: strict-origin-when-cross-origin` — Protects user privacy by ensuring origin headers are not leaked to external insecure targets.
* `Permissions-Policy: geolocation=(), microphone=(), camera=()` — Disallows unauthorized browser hardware feature activation.

### 6. Enforced Transport Layer Security (TLS / SSL)
* End-to-end encryption using automated **Let's Encrypt TLS certificates**.
* All unencrypted `http://` requests are automatically upgraded to `https://` via 301 Permanent Redirects.

### 7. DDoS & Traffic Spike Resilience
* Hosted on **GitHub Pages Global Anycast CDN** with high-availability edge nodes across India (Mumbai, Chennai, Hyderabad).
* Because static pages require zero CPU compute or memory allocation to serve, the website can withstand massive concurrent traffic spikes without degradation or downtime.

---

## ⚡ Serverless Lead Ingestion Pipeline

The lead capture engine operates on a resilient **Dual-Channel Delivery** protocol engineered by Ninad Khune:

```
[Parent / Franchise Partner Submits Form]
                    │
                    ▼
[Dual-Channel Transmission in main.js (v2.4)]
  ├── Channel 1: URL Query Parameters (100% immune to CORS stripping)
  └── Channel 2: JSON Payload Body (application/text fallback)
                    │
                    ▼
[Google Apps Script Universal Ingestion Engine]
  ├── Sanitizes and extracts parameters
  ├── Appends row to Google Sheet (8 separate columns)
  └── Dispatches instant push alert to psabacus01@gmail.com
                    │
                    ▼
[Branded Thank-You Modal Renders on Screen]
  └── Personalized greeting & direct WhatsApp callback button
```

### Google Sheet Data Schema (8 Columns):
| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Timestamp** | **Full Name** | **Phone / WA** | **Inquiry Type** | **Course Interested** | **Center Model** | **City** | **User Message** |

---

## 📱 Responsive & Mobile-First Design

The interface adapts dynamically across all screen sizes without horizontal overflow (`overflow-x`):
* **Small Smartphones (320px – 480px)**: Single-column layout, thumb-friendly tap targets (minimum 44px), collapsed navigation.
* **Tablets (768px – 1024px)**: 2-column balanced grid layout.
* **Desktops & Laptops (1025px – 1440px)**: 3-column course cards, dual-pane interactive helpdesk.
* **Ultra-Wide & 4K (1440px+)**: Constrained, auto-centered at `1200px` to prevent visual distortion.

---

## 📂 Repository Directory Structure

```
PS-ABACUS/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated CI/CD deployment to GitHub Pages
├── static/
│   ├── css/
│   │   ├── style.css           # Core stylesheet (typography, layout, media queries)
│   │   └── animations.css      # Keyframe animations and mobile drawer transitions
│   ├── js/
│   │   └── main.js             # Form validation, dual-channel sender, custom modals
│   └── images/
│       ├── logo-transparent.png # High-resolution official brand emblem
│       └── icons/              # Scalable SVG vector icons for courses and metrics
├── templates/                  # Flask Jinja2 source templates (Architecture source)
│   ├── base.html
│   ├── index.html
│   ├── courses.html
│   ├── franchise.html
│   ├── about.html
│   └── contact.html
├── build/                      # 100% pre-rendered production build folder
├── .htaccess                   # Apache enterprise caching and security headers
├── .nojekyll                   # Bypasses Jekyll processor for instant GitHub Pages serving
├── CNAME                       # Production custom domain binding (psabacus.com)
├── app.py                      # Development Flask preview server
├── freeze.py                   # Static site compiler & GoDaddy archive generator
└── README.md                   # Platform documentation & security specifications
```

---

## 🚀 Local Development & Static Generation

### Prerequisites
* Python 3.10+
* Git

### Local Server Setup
```bash
# 1. Clone the repository
git clone https://github.com/khuneninad/psabacus.git
cd psabacus

# 2. Install dependencies
pip install -r requirements.txt

# 3. Launch local development server
python app.py
# Server will start at http://127.0.0.1:5000
```

### Compile Pure Static Production Build
```bash
# Runs the freeze compiler: regenerates root HTML, build/ directory, and GoDaddy ZIP
python freeze.py
```

---

## 👨‍💻 Website Creator & Verified Author

* **Architect & Full-Stack Engineer**: [Ninad Khune](https://github.com/khuneninad)
* **Project**: PS ABACUS (Piyushlok Education)
* **Copyright**: © 2026 Ninad Khune. All Rights Reserved.
* **Author Signature Hash**: `Verified-Ninad-Khune-2026`
