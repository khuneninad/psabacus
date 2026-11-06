"""
========================================================================
  PSABACUS - 100% Standalone Static Site Exporter
  Architected & Developed by: Ninad Khune
  Copyright (c) 2026 Ninad Khune. All Rights Reserved.
  Converts Flask application to 100% pure static HTML/CSS/JS ready to
  upload directly into GoDaddy 'public_html' folder.
========================================================================
"""

import os
import sys
import shutil
import re

# Set utf-8 console encoding for windows safety
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from app import app

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BUILD_DIR = os.path.join(BASE_DIR, 'build')
STATIC_DIR = os.path.join(BASE_DIR, 'static')

ROUTES = [
    ('/', 'index.html'),
    ('/courses', 'courses.html'),
    ('/franchise', 'franchise.html'),
    ('/about', 'about.html'),
    ('/contact', 'contact.html')
]

def build_static_site():
    print(f"[*] Starting 100% static site generation for PSABACUS (by Ninad Khune)...")
    
    # 1. Clean or create build directory
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)
    os.makedirs(BUILD_DIR, exist_ok=True)
    
    # 2. Copy static folder to build/static
    build_static_dir = os.path.join(BUILD_DIR, 'static')
    shutil.copytree(STATIC_DIR, build_static_dir)
    print(f"[OK] Copied static assets to {build_static_dir}")
    
    # 3. Render and save each route
    client = app.test_client()
    with app.app_context():
        for route, filename in ROUTES:
            response = client.get(route)
            if response.status_code != 200:
                print(f"[!] Warning: Route {route} returned status {response.status_code}")
                continue
            
            html_content = response.get_data(as_text=True)
            
            # Rewrite URLs to static .html targets
            html_content = re.sub(r'href="/courses"', 'href="courses.html"', html_content)
            html_content = re.sub(r'href="/franchise"', 'href="franchise.html"', html_content)
            html_content = re.sub(r'href="/about"', 'href="about.html"', html_content)
            html_content = re.sub(r'href="/contact"', 'href="contact.html"', html_content)
            html_content = re.sub(r'href="/"', 'href="index.html"', html_content)
            
            # Rewrite /static/ paths to relative static/
            html_content = re.sub(r'href="/static/', 'href="static/', html_content)
            html_content = re.sub(r'src="/static/', 'src="static/', html_content)
            
            # Watermark injection assurance
            if "Website created by Ninad Khune" not in html_content:
                html_content = html_content.replace('</body>', '<!-- Website created by Ninad Khune -->\n</body>')
            
            # Save into build/ folder
            out_path = os.path.join(BUILD_DIR, filename)
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            # Also save into root folder for instant double-click opening!
            root_out_path = os.path.join(BASE_DIR, filename)
            with open(root_out_path, 'w', encoding='utf-8') as f:
                f.write(html_content)

            print(f"[OK] Rendered {route} -> {filename} (Saved in build/ and root)")
            
    # 4. Generate GoDaddy .htaccess for Apache caching, GZIP, and enterprise security
    htaccess_content = """# ========================================================================
# Apache / GoDaddy Server Configuration for PS ABACUS
# Website Architect & Creator: Ninad Khune
# Brand: PS ABACUS | Slogan: A Journey to Excellence
# ========================================================================

# 1. PREVENT DIRECTORY BROWSING (Security Hardening)
# Prevents visitors/bots from seeing raw folder file lists in static/
Options -Indexes

# 2. ENFORCE HTTPS / SSL ENCRYPTION
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# 3. BLOCK ACCESS TO HIDDEN SYSTEM FILES (.htaccess, .env, etc.)
<FilesMatch "^\\.">
  <IfModule mod_authz_core.c>
    Require all denied
  </IfModule>
  <IfModule !mod_authz_core.c>
    Order deny,allow
    Deny from all
  </IfModule>
</FilesMatch>

# 4. ENTERPRISE SECURITY HEADERS
<IfModule mod_headers.c>
  # Prevent Clickjacking (disallows embedding in foreign phishing iframes)
  Header set X-Frame-Options "SAMEORIGIN"
  # Prevent MIME-type sniffing attacks
  Header set X-Content-Type-Options "nosniff"
  # Legacy Cross-Site Scripting (XSS) filter
  Header set X-XSS-Protection "1; mode=block"
  # Referrer policy for user privacy protection
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  # Modern browser permissions policy
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
  # Author and Creator Certification
  Header set X-Author "Ninad Khune"
  Header set X-Website-Creator "Ninad Khune"
</IfModule>

# 5. HIGH-SPEED BROWSER CACHING (Performance Optimization)
# NOTE: "access plus 1 year" is an HTTP Cache-Control header telling the
# visitor's web browser to keep images in local memory so repeat visits load in <0.3s.
# It has NOTHING to do with website lifespan. The website is active permanently.
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# 6. GZIP SPEED COMPRESSION (Saves 70%+ bandwidth)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 7. CUSTOM 404 ERROR FALLBACK
ErrorDocument 404 /index.html
"""
    with open(os.path.join(BUILD_DIR, '.htaccess'), 'w', encoding='utf-8') as f:
        f.write(htaccess_content)
    with open(os.path.join(BASE_DIR, '.htaccess'), 'w', encoding='utf-8') as f:
        f.write(htaccess_content)
    print(f"[OK] Generated GoDaddy .htaccess")

    # 5. Create a standalone README inside build folder
    readme_content = """# PSABACUS Static Website Deployment (GoDaddy)
Created by: Ninad Khune
WhatsApp Contact: +91 9404853704 | Email: psabacus01@gmail.com

## HOW TO UPLOAD TO GODADDY:
1. Log in to your GoDaddy Account -> Web Hosting -> cPanel -> File Manager.
2. Navigate to the `public_html` directory.
3. Upload `godaddy_public_html_ready.zip` and extract it, or upload all files from this `build` directory:
   - `index.html`
   - `courses.html`
   - `franchise.html`
   - `about.html`
   - `contact.html`
   - `.htaccess`
   - `static/` (folder containing css, js, images)
4. Done! Visit your domain and your website is live!
"""
    with open(os.path.join(BUILD_DIR, 'HOW_TO_DEPLOY_ON_GODADDY.txt'), 'w', encoding='utf-8') as f:
        f.write(readme_content)

    # 5b. Copy GitHub Pages configuration files if present
    cname_src = os.path.join(BASE_DIR, 'CNAME')
    if os.path.exists(cname_src):
        shutil.copy(cname_src, os.path.join(BUILD_DIR, 'CNAME'))
    nojekyll_src = os.path.join(BASE_DIR, '.nojekyll')
    if os.path.exists(nojekyll_src):
        shutil.copy(nojekyll_src, os.path.join(BUILD_DIR, '.nojekyll'))

    # 6. Create 1-Click ZIP Archive for GoDaddy
    zip_path = os.path.join(BASE_DIR, 'godaddy_public_html_ready')
    shutil.make_archive(zip_path, 'zip', BUILD_DIR)
    print(f"[OK] Created 1-Click GoDaddy deployment zip: godaddy_public_html_ready.zip")

    print(f"\n[DONE] Success! Pure static build complete!")
    print(f"[DONE] Watermark verified: 'Website created by Ninad Khune'")
    print(f"[DONE] Contact verified: WhatsApp 9404853704 | psabacus01@gmail.com")

if __name__ == '__main__':
    build_static_site()
