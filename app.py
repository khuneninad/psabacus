"""
========================================================================
  PS ABACUS - Official Website Application
  Architected, Designed & Developed by: Ninad Khune
  Copyright (c) 2026 Ninad Khune. All Rights Reserved.
  Framework: Python / Flask
  Contact: +91 9404853704 / +91 8275635904 | Gmail: psabacus01@gmail.com
  Slogan: A Journey to Excellence
========================================================================
"""

import os
from datetime import datetime
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'ps-abacus-ninad-khune-secure-key-2026'

# Master Site Metadata
SITE_CONFIG = {
    'brand_name': 'PS ABACUS',
    'tagline': 'A Journey to Excellence',
    'msme_badge': 'Registered with MSME',
    'author': 'Ninad Khune',
    'creator': 'Ninad Khune',
    'contact_phone_1': '+91 9404853704',
    'contact_phone_1_raw': '9404853704',
    'contact_phone_2': '+91 8275635904',
    'contact_phone_2_raw': '8275635904',
    'contact_phones': '+91 9404853704 / +91 8275635904',
    'contact_email': 'psabacus01@gmail.com',
    'contact_whatsapp': '919404853704',
    'address': '15+ Centers Across Maharashtra & India',
    'stats': {
        'students': '500+',
        'centers': '15+',
        'years': '5+'
    },
    'copyright_year': datetime.now().year
}

# Courses Data with Top-Notch SVGs
COURSES_DATA = [
    {
        'id': 'abacus',
        'title': 'Abacus',
        'slug': 'abacus',
        'age_group': '5 to 14 Years',
        'icon': 'icons/abacus.svg',
        'badge': 'Most Popular',
        'whatsapp_msg': 'Hello PS ABACUS, I would like to inquire about Abacus classes for my child.',
        'description': 'Master mental arithmetic using the ancient abacus technique. Our structured program develops number sense, boosts memory, and sharpens concentration in children.',
        'benefits': [
            'Enhances mental calculation speed',
            'Improves concentration & focus',
            'Develops photographic memory',
            'Builds confidence in mathematics'
        ],
        'details': 'The Abacus program activates both left and right hemispheres of the brain. Through hands-on bead manipulation transitioning into mental visualization, children solve multi-digit addition, subtraction, multiplication, and division in seconds without pen and paper.',
        'levels': '8 Comprehensive Levels',
        'duration_per_level': '2 to 3 Months (2 Hours/week)'
    },
    {
        'id': 'vedic-maths',
        'title': 'Vedic Maths',
        'slug': 'vedic-maths',
        'age_group': '9+ Years & Competitive Aspirants',
        'icon': 'icons/vedic-maths.svg',
        'badge': 'High Speed',
        'whatsapp_msg': 'Hello PS ABACUS, I would like to inquire about Vedic Maths courses.',
        'description': 'Learn powerful mathematical shortcuts derived from ancient Vedic scriptures. Students solve complex problems in seconds using simple, elegant techniques.',
        'benefits': [
            'Lightning-fast calculations',
            'Ancient proven techniques',
            'Covers all arithmetic operations',
            'Competitive exam preparation'
        ],
        'details': 'Based on the 16 Sutras and 13 Sub-sutras, Vedic Mathematics simplifies algebra, square roots, cubes, equations, and complex multiplications into 1-line mental operations. Essential for Olympiads, scholarship exams, and academic excellence.',
        'levels': 'Foundation, Intermediate, Advanced',
        'duration_per_level': '3 Months per Module'
    },
    {
        'id': 'handwriting',
        'title': 'Handwriting',
        'slug': 'handwriting',
        'age_group': '6+ Years to Adults',
        'icon': 'icons/handwriting.svg',
        'badge': 'Visible Results in 15 Days',
        'whatsapp_msg': 'Hello PS ABACUS, I would like to inquire about Handwriting improvement classes.',
        'description': 'Transform messy handwriting into neat, legible, and beautiful script. Our systematic approach improves letter formation, spacing, and writing speed.',
        'benefits': [
            'Improved letter formation',
            'Better speed & neatness',
            'Boosts presentation marks',
            'Structured practice methodology'
        ],
        'details': 'Handwriting directly influences exam scores. Our scientifically designed motor-control drills correct pencil grip, posture, letter slant, spacing, and baseline alignment in English Print and Cursive scripts.',
        'levels': 'Cursive & Print Script Modules',
        'duration_per_level': '15 to 30 Days Fast-Track Program'
    }
]

# Franchise Data
FRANCHISE_DATA = {
    'headline': 'Book a Franchise',
    'subheadline': 'Partner with PS ABACUS and build a rewarding education business',
    'three_pillars': [
        {
            'icon': 'icons/rupee-investment.svg',
            'title': 'Very Low Investment',
            'description': 'Start your own coaching center with minimal capital. Our franchise model is designed to be accessible and affordable for aspiring entrepreneurs.'
        },
        {
            'icon': 'icons/tech-support.svg',
            'title': 'Full Technical Support',
            'description': "We provide complete technical assistance — from setup to day-to-day operations. You're never alone on this journey."
        },
        {
            'icon': 'icons/course-material.svg',
            'title': 'Own Course Material',
            'description': 'We have developed our own proprietary course material, refined over years of research and classroom experience. No third-party dependency.'
        }
    ],
    'golden_banner': {
        'stars': 5,
        'title': 'We Have Developed Our Own Course Material',
        'text': 'Our proprietary curriculum is the backbone of every PS ABACUS center — carefully crafted, classroom-tested, and continuously improved to deliver exceptional learning outcomes.'
    },
    'franchise_benefits': [
        {'title': 'Zero High Royalties', 'desc': 'Keep your hard-earned profits. We operate on a fair, supportive franchise model.'},
        {'title': 'Complete Teacher Training', 'desc': 'Full certification for you and your staff with comprehensive pedagogy handbooks.'},
        {'title': 'Student Kits & Materials', 'desc': 'Original Abacus tools, workbooks, practice test papers, and progress trackers.'},
        {'title': 'Marketing & Lead Support', 'desc': 'Banners, flyers, social media creatives, and guidance on parent orientations.'},
        {'title': 'Low Space Requirement', 'desc': 'Can be started from home, an existing school/tuition center, or dedicated commercial space.'},
        {'title': 'Rapid ROI', 'desc': 'Break even within 2 to 4 months with healthy recurring monthly student fee income.'}
    ]
}

@app.context_processor
def inject_globals():
    return dict(site=SITE_CONFIG, author_watermark='Website created by Ninad Khune')

@app.route('/')
def index():
    return render_template(
        'index.html',
        courses=COURSES_DATA,
        franchise=FRANCHISE_DATA
    )

@app.route('/courses')
def courses():
    return render_template(
        'courses.html',
        courses=COURSES_DATA
    )

@app.route('/franchise')
def franchise():
    return render_template(
        'franchise.html',
        franchise=FRANCHISE_DATA
    )

@app.route('/about')
def about():
    return render_template(
        'about.html',
        franchise=FRANCHISE_DATA
    )

@app.route('/contact')
def contact():
    return render_template(
        'contact.html',
        courses=COURSES_DATA
    )

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
