/**
 * ========================================================================
 *   PS ABACUS Official Interactive Script (v2.2)
 *   Website Architect & Engineer: Ninad Khune
 *   Copyright (c) 2026 Ninad Khune. All Rights Reserved.
 *   Verified Author Signature: NK-PSABACUS-2026
 *   Helplines: 9404853704 / 8275635904 | Slogan: A Journey to Excellence
 *   Connected to Google Apps Script Web App for Real-Time Gmail & Sheets
 * ========================================================================
 */

// Official Google Apps Script Webhook Endpoint
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3Qy_2TnH4q9QqOfiYZr_Z36e7PI5Q8dkgP6F7iDBkOV_E8EK_zSQbAKZztMd-dmw/exec";

// Modal Management Functions
function openThankYouModal(info) {
  const modal = document.getElementById("thankYouModal");
  if (!modal) return;

  document.getElementById("modalUserName").textContent = info.name || "Friend";
  document.getElementById("modalInquiryType").textContent = info.type || "Student Admission";
  document.getElementById("modalCityVal").textContent = info.city || "N/A";

  const courseRow = document.getElementById("modalCourseRow");
  const modelRow = document.getElementById("modalModelRow");

  if (info.type === "Student Admission") {
    if (courseRow) {
      courseRow.style.display = "flex";
      document.getElementById("modalCourseVal").textContent = info.course || "Abacus";
    }
    if (modelRow) modelRow.style.display = "none";
  } else {
    if (courseRow) courseRow.style.display = "none";
    if (modelRow) {
      modelRow.style.display = "flex";
      document.getElementById("modalModelVal").textContent = info.franchise_model || "Home-Based Center";
    }
  }

  // Update direct WhatsApp link inside modal
  const waBtn = document.getElementById("modalWhatsAppBtn");
  if (waBtn) {
    waBtn.href = `https://wa.me/919404853704?text=Hi%20PS%20ABACUS,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(info.name)}%20(${encodeURIComponent(info.type)}).`;
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeThankYouModal() {
  const modal = document.getElementById("thankYouModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close modal when clicking outside
window.addEventListener("click", function (e) {
  const modal = document.getElementById("thankYouModal");
  if (modal && e.target === modal) {
    closeThankYouModal();
  }
});

// Invisible / Developer Console Watermark Signature
(function certifyCreator() {
  const author = "Ninad Khune";
  const project = "PS ABACUS — A Journey to Excellence";
  const year = "2026";
  
  console.log(
    `%c 🚀 ${project} %c Designed & Developed by ${author} © ${year} `,
    "background: #000000; color: #f5a623; font-weight: 800; font-size: 13px; padding: 5px 10px; border-radius: 4px 0 0 4px; border: 1px solid #f5a623;",
    "background: #f5a623; color: #000000; font-weight: 700; font-size: 13px; padding: 5px 10px; border-radius: 0 4px 4px 0; border: 1px solid #f5a623;"
  );
  
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.setAttribute("data-architect", author);
    document.documentElement.setAttribute("data-watermark", "Verified-Ninad-Khune-2026");
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Menu Toggle
  const mobileToggleBtn = document.querySelector(".mobile-toggle");
  const mobileCloseBtn = document.querySelector(".mobile-close-btn");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener("click", () => {
      mobileDrawer.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // 2. Animated Stats Counter
  const counterElements = document.querySelectorAll(".counter-value");
  let animated = false;

  function runCounters() {
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1800;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    });
  }

  const statsSection = document.querySelector(".stats-grid");
  if (statsSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    runCounters();
  }

  // 3. Dual-Tab Inquiry Mode Toggle (Student Admission vs Franchise Partnership)
  const tabBtns = document.querySelectorAll(".form-toggle-tabs .tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const container = this.closest(".inquiry-form-container");
      if (!container) return;

      container.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      
      const mode = this.getAttribute("data-mode");
      const hiddenType = container.querySelector("input[name='type']");
      const courseSelectGroup = container.querySelector(".student-course-group");
      const franchiseSelectGroup = container.querySelector(".franchise-model-group");
      const msgArea = container.querySelector("textarea[name='message']");

      if (hiddenType) {
        hiddenType.value = mode;
      }

      if (mode === "Franchise Partnership") {
        if (courseSelectGroup) courseSelectGroup.style.display = "none";
        if (franchiseSelectGroup) franchiseSelectGroup.style.display = "block";
        if (msgArea) msgArea.placeholder = "Tell us about your city, space availability (home/commercial), and business background...";
      } else {
        if (courseSelectGroup) courseSelectGroup.style.display = "block";
        if (franchiseSelectGroup) franchiseSelectGroup.style.display = "none";
        if (msgArea) msgArea.placeholder = "Child's name, age/class, preferred timing or questions...";
      }
    });
  });

  // 4. Clean Google Sheets + Apps Script Real-Time Submission Handler
  const inquiryForms = document.querySelectorAll(".google-sheet-inquiry-form, #inquiryForm");
  
  inquiryForms.forEach(form => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector("button[type='submit']");
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "Submit Inquiry";
      const statusBox = this.querySelector(".form-status-message");

      // Validate inputs
      const name = (this.querySelector("[name='name']")?.value || "").trim();
      const phone = (this.querySelector("[name='phone']")?.value || "").trim();
      const type = (this.querySelector("[name='type']")?.value || "Student Admission").trim();
      const city = (this.querySelector("[name='city']")?.value || "").trim();
      
      // PURE user message text only — NEVER append or modify!
      const userTypedMessage = (this.querySelector("[name='message']")?.value || "").trim();
      
      const isStudent = (type === "Student Admission");
      const courseVal = this.querySelector("[name='course']")?.value || "Abacus";
      const modelVal = this.querySelector("[name='franchise_model']")?.value || "Home-Based Center";

      // Dedicated clean separate fields
      const finalCourse = isStudent ? courseVal : "N/A";
      const finalModel = !isStudent ? modelVal : "N/A";

      if (!name || !phone || !city) {
        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.className = "form-status-message status-error";
          statusBox.innerHTML = "Please enter your name, phone number, and city.";
        }
        return;
      }

      // UI Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Inquiry...';
      }

      if (statusBox) {
        statusBox.style.display = "none";
      }

      // Prepare clean payload object
      const payload = {
        name: name,
        phone: phone,
        type: type,
        course: finalCourse,
        franchise_model: finalModel,
        city: city,
        message: userTypedMessage || "None"
      };

      // Dual-Channel Delivery:
      // 1. Query String params guarantees e.parameter extraction even under CORS / no-cors
      // 2. JSON Body guarantees e.postData extraction
      const queryParams = new URLSearchParams();
      Object.keys(payload).forEach(key => queryParams.append(key, payload[key]));
      const requestUrl = `${GOOGLE_SCRIPT_URL}?${queryParams.toString()}`;

      // POST to Google Apps Script Web App
      fetch(requestUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        // Reset submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }

        // Show Beautiful Custom Thank You Modal!
        openThankYouModal({
          name: name,
          phone: phone,
          type: type,
          course: finalCourse,
          franchise_model: finalModel,
          city: city
        });

        // Reset form inputs
        form.reset();
      })
      .catch(error => {
        console.error("Submission error:", error);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }

        if (statusBox) {
          statusBox.style.display = "block";
          statusBox.className = "form-status-message status-error";
          statusBox.innerHTML = `
            Unable to connect right now. Please message us directly on WhatsApp at 
            <a href="https://wa.me/919404853704" style="text-decoration: underline; font-weight: 800; color: #991b1b;">9404853704</a> or call <a href="tel:+918275635904" style="text-decoration: underline; font-weight: 800; color: #991b1b;">8275635904</a>.
          `;
        }
      });
    });
  });
});
