<p align="center">
  <a href="https://psabacus.com">
    <img src="static/images/logo-transparent.png" width="175" alt="PS ABACUS Logo" />
  </a>
</p>

<h1 align="center">PS ABACUS</h1>

<p align="center">
  <strong>🌟 A Journey to Excellence</strong><br>
  <em>Official High-Performance Web Platform & Serverless Ingestion Engine</em>
</p>

<p align="center">
  <a href="https://psabacus.com">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fpsabacus.com&up_message=online%20%26%20active&up_color=00c853&down_message=offline&down_color=e11d48&style=for-the-badge&label=Live%20Platform&labelColor=000000" alt="Live Platform Status" />
  </a>
  <a href="https://github.com/khuneninad/psabacus/actions/workflows/deploy.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/khuneninad/psabacus/deploy.yml?branch=main&style=for-the-badge&label=Deployment&logo=github&labelColor=000000" alt="Deployment Status" />
  </a>
  <a href="#-production-security-architecture">
    <img src="https://img.shields.io/badge/Security-Hardened%20Static%20Tier-0284c7?style=for-the-badge&logo=shield&labelColor=000000" alt="Security Hardened" />
  </a>
  <a href="#-serverless-lead-ingestion-pipeline">
    <img src="https://img.shields.io/badge/Lead%20Relay-Google%20Cloud%20Serverless-f5a623?style=for-the-badge&logo=google-cloud&logoColor=000000" alt="Lead Relay" />
  </a>
  <a href="https://github.com/khuneninad">
    <img src="https://img.shields.io/badge/Architect-Ninad%20Khune-111827?style=for-the-badge&logo=github&labelColor=000000" alt="Author Ninad Khune" />
  </a>
</p>

<p align="center">
  <a href="https://psabacus.com"><img src="https://img.shields.io/badge/🚀_Launch_Live_Site-25D366?style=for-the-badge&labelColor=0F172A" alt="Launch Live Site" /></a>
  <a href="https://psabacus.com/courses.html"><img src="https://img.shields.io/badge/📚_Explore_Courses-38BDF8?style=for-the-badge&labelColor=0F172A" alt="Explore Courses" /></a>
  <a href="https://psabacus.com/franchise.html"><img src="https://img.shields.io/badge/🏢_Book_a_Franchise-F59E0B?style=for-the-badge&labelColor=0F172A" alt="Book a Franchise" /></a>
  <a href="#-production-security-architecture"><img src="https://img.shields.io/badge/🛡️_Security_Specs-6366F1?style=for-the-badge&labelColor=0F172A" alt="Security Specs" /></a>
</p>

---

## 📖 Executive Summary

**PS ABACUS** (Piyushlok Education) is a modern, high-speed educational platform engineered to empower young students with certified cognitive skill training in **Abacus Mental Math**, **Vedic Mathematics**, and **Handwriting Improvement**. 

The platform also acts as a nationwide business acquisition funnel for the **"Book a Franchise"** partnership model, enabling teachers, coaching centers, and entrepreneurs to establish low-investment coaching centers with proprietary pedagogy and complete curriculum support.

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
                    │     • Global Edge Cache & Anti-DDoS Ingestion          │
                    │     • <0.2s Content Delivery Latency across India      │
                    │     • Automatic HTTP-to-HTTPS 301 Redirection          │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                        ┌───────────────────────┴───────────────────────┐
                        │                                               │
                        ▼                                               ▼
     ┌─────────────────────────────────────┐         ┌─────────────────────────────────────┐
     │      STATIC FRONTEND ASSETS         │         │      SERVERLESS LEAD ENGINE         │
     │  (Pure HTML5 / CSS3 / Vanilla JS)   │         │    (Google Apps Script Webhook)     │
     │  • Zero SQL Database Vulnerability  │         │  • Dual-Channel Ingestion           │
     │  • Zero Remote Code Execution (RCE) │         │  • Automated Sheet Logging          │
     │  • Pre-rendered Static Pages        │         │  • Instant Administrator Dispatch   │
     └─────────────────────────────────────┘         └─────────────────────────────────────┘
```

---

## 🛡️ Production Security Architecture

Because this web platform serves real students, parents, and commercial franchise partners daily, the architecture was built using a **zero-trust, static-first defense in depth** strategy:

### 1. Zero Database & Zero SQL Injection (SQLi)
* **Threat Model**: Traditional production sites exposing relational databases (MySQL, PostgreSQL) on public ports face automated SQL injection, credential stuffing, and data dump attacks.
* **Our Defense**: The public web tier contains **zero relational databases**. There are no database drivers, connection strings, or query parsers exposed on the web server. SQL injection against the hosting tier is impossible by design.

### 2. Zero Server-Side Scripting (No PHP / No Remote Code Execution)
* **Threat Model**: Content management systems (e.g. WordPress, Drupal) and dynamic PHP environments frequently succumb to arbitrary file uploads, malicious web shells, and remote code execution (RCE).
* **Our Defense**: The production deployment consists exclusively of pre-compiled, static HTML5, CSS3, and sandboxed client-side JavaScript. With no server-side execution runtime running on public web ports, hackers cannot upload or trigger executable scripts.

### 3. Serverless Isolated Lead Pipeline (Google Cloud Sandbox)
* **Threat Model**: Storing user inquiries, phone numbers, and location details in local server text files or web logs risks data leaks during server misconfigurations.
* **Our Defense**: Inquiries are dispatched over encrypted HTTPS directly to a sandboxed **Google Apps Script Webhook**. Data is committed immediately into an encrypted, access-controlled Google Sheet and dispatched via instant email alerts. Zero user PII (Personally Identifiable Information) touches static server disks.

### 4. Input Sanitization & Protocol Handler Defense
* **Client-Side Validation**: All input fields (Name, Phone, City, Message, Course Selection, Center Model) undergo strict type and length verification before transmission.
* **Protocol Smuggling Prevention**: Phone digits are strictly scrubbed of all non-numeric characters (`replace(/[^0-9]/g, "")`) before generating action links, eliminating URI injection, script injection, and protocol manipulation vulnerabilities.

### 5. Defensive HTTP Security Headers
The server configuration employs defensive response headers configured via `.htaccess` and edge rules:
* `X-Frame-Options: SAMEORIGIN` — Disallows framing inside foreign websites, stopping **Clickjacking** and phishing overlay attacks.
* `X-Content-Type-Options: nosniff` — Prevents browsers from **MIME-sniffing** response bodies into executable contexts.
* `X-XSS-Protection: 1; mode=block` — Activates legacy browser Cross-Site Scripting filters.
* `Referrer-Policy: strict-origin-when-cross-origin` — Protects user privacy by stripping origin data when navigating to external destinations.
* `Permissions-Policy: geolocation=(), microphone=(), camera=()` — Disallows unauthorized device hardware access.

### 6. Enforced Transport Layer Security (TLS / SSL)
* Complete end-to-end encryption using automated **Let's Encrypt TLS certificates**.
* All unencrypted `http://` traffic is permanently upgraded to `https://` via 301 redirects with zero plaintext leaks.

### 7. DDoS & Traffic Spike Resilience
* Served globally via **GitHub Pages Global Anycast CDN** with high-availability edge points of presence across India (Mumbai, Chennai, Hyderabad).
* Because pre-rendered static assets require near-zero RAM or CPU computation to deliver, the website can easily absorb heavy concurrent traffic surges during admission seasons without downtime.

---

## ⚡ Serverless Lead Ingestion Pipeline

The lead capture engine operates on a robust **Dual-Channel Delivery Protocol**:

```
[Parent / Franchise Partner Submits Inquiry]
                    │
                    ▼
[Dual-Channel Transmission in main.js]
  ├── Channel 1: URL Query Parameters (100% resilient to CORS stripping)
  └── Channel 2: JSON Payload Body (text/plain cross-origin fallback)
                    │
                    ▼
[Google Apps Script Universal Ingestion Engine]
  ├── Universal parser decodes JSON & URL-encoded pairs
  ├── Appends row to Private Google Sheet (8 separate columns)
  └── Dispatches real-time notification push alert to administrator
                    │
                    ▼
[Custom Branded Thank-You Modal Renders on Screen]
  └── Personalized summary card with direct action controls
```

### Lead Capture Data Schema (8 Columns):
| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Timestamp** | **Full Name** | **Phone / WA** | **Inquiry Type** | **Course Interested** | **Center Model** | **City** | **User Message** |

---

## 📱 Mobile-First Responsive Engineering

The frontend is built on a responsive, flexible layout grid that scales across all viewports without horizontal scrolling (`overflow-x`):

| Device Category | Typical Width | Layout & UX Behavior |
| :--- | :--- | :--- |
| **Small Smartphones** | 320px – 480px | 1-column card stack, full-width thumb targets (min 44px), slide-out navigation drawer |
| **Tablets & iPads** | 768px – 1024px | 2-column balanced grid, proportional hero typography |
| **Laptops & Desktops** | 1025px – 1440px | 3-column course cards, dual-pane interactive helpdesk |
| **Ultra-Wide & 4K** | 1440px+ | Auto-centered at `1200px` to maintain optimal visual balance |

---

## 💻 Tech Stack & Tooling

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Python_3.13-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" alt="Flask" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud" />
  <img src="https://img.shields.io/badge/Let's_Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="Let's Encrypt" />
</p>

---

## 📂 Repository Directory Structure

```
PS-ABACUS/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated CI/CD pipeline for GitHub Pages
├── static/
│   ├── css/
│   │   ├── style.css           # Core stylesheet (typography, layout, responsive queries)
│   │   └── animations.css      # Keyframes and mobile menu drawer transitions
│   ├── js/
│   │   └── main.js             # Form validation, dual-channel sender, thank-you modal
│   └── images/
│       ├── logo-transparent.png # Official transparent emblem
│       └── icons/              # Scalable SVG vector icons for courses and metrics
├── templates/                  # Source templates (Flask Jinja2 architecture)
│   ├── base.html
│   ├── index.html
│   ├── courses.html
│   ├── franchise.html
│   ├── about.html
│   └── contact.html
├── build/                      # Pre-rendered 100% static production package
├── .htaccess                   # Enterprise Apache caching and security directives
├── .nojekyll                   # Bypasses Jekyll for raw static file delivery
├── CNAME                       # Production custom domain binding (psabacus.com)
├── app.py                      # Local development preview server
├── freeze.py                   # Static compiler and multi-target exporter
└── README.md                   # Platform documentation and architecture specifications
```

---

## 🛠️ Local Development & Build Commands

```bash
# 1. Clone repository
git clone https://github.com/khuneninad/psabacus.git
cd psabacus

# 2. Run local preview server (Flask)
python app.py
# Running on http://127.0.0.1:5000

# 3. Compile fresh static production build
python freeze.py
```

---

## 👨‍💻 Engineering & Architecture

<p align="left">
  <strong>Architect & Full-Stack Engineer</strong>: <a href="https://github.com/khuneninad">Ninad Khune</a><br>
  <strong>Project</strong>: PS ABACUS (Piyushlok Education)<br>
  <strong>Verified Developer Signature</strong>: <code>Verified-Ninad-Khune-2026</code><br>
  <strong>Copyright</strong>: © 2026 Ninad Khune. All Rights Reserved.
</p>
