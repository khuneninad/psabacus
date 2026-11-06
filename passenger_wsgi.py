"""
========================================================================
  GoDaddy Hosting cPanel Python Application Entry Point
  Project: PSABACUS Classes Official Website
  Website created by Ninad Khune
  Copyright (c) 2026 Ninad Khune. All Rights Reserved.
========================================================================
"""

import sys
import os

# Append application directory to sys.path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if SCRIPT_DIR not in sys.path:
    sys.path.insert(0, SCRIPT_DIR)

# Import Flask app and alias as application for Passenger WSGI
from app import app as application
