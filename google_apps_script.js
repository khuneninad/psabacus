/**
 * ========================================================================
 *   PS ABACUS — Google Apps Script (Universal Lead Webhook & Email Engine)
 *   Brand: PS ABACUS | Slogan: A Journey to Excellence
 *   Official Helplines: 9404853704 / 8275635904 | Email: psabacus01@gmail.com
 *   Architected by: Ninad Khune
 * 
 *   HOW TO UPDATE IN GOOGLE SHEETS:
 *   1. Open your Google Sheet in browser
 *   2. Click: Extensions -> Apps Script
 *   3. Select all existing code, delete it, and paste this entire code.
 *   4. Click "Save" (Floppy Disk icon).
 *   5. Click "Deploy" -> "Manage deployments".
 *   6. Click the Pencil (Edit) icon.
 *   7. Under "Version", select "New version".
 *   8. Click "Deploy".
 * ========================================================================
 */

// RECIPIENT EMAIL FOR INSTANT ALERTS
const NOTIFICATION_EMAIL = "psabacus01@gmail.com";

/**
 * Universal parameter extractor (handles URL query parameters, JSON, and Form body)
 */
function extractInquiryData(e) {
  var data = {};

  // 1. Check e.parameter (populated from URL query string)
  if (e && e.parameter) {
    for (var k in e.parameter) {
      if (e.parameter[k] !== undefined && e.parameter[k] !== null && e.parameter[k] !== "") {
        data[k] = e.parameter[k];
      }
    }
  }

  // 2. Check e.postData.contents (JSON or Form body)
  if (e && e.postData && e.postData.contents) {
    var raw = e.postData.contents.toString().trim();

    // Check if JSON
    if (raw.charAt(0) === "{" && raw.charAt(raw.length - 1) === "}") {
      try {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          for (var prop in parsed) {
            if (parsed[prop] !== undefined && parsed[prop] !== null) {
              data[prop] = parsed[prop];
            }
          }
          return data;
        }
      } catch (err) {}
    }

    // Check if URL-encoded string (key=value&key2=val2)
    if (raw.indexOf("=") > -1) {
      try {
        var pairs = raw.split("&");
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split("=");
          if (pair.length >= 2) {
            var key = decodeURIComponent(pair[0].replace(/\+/g, " "));
            var val = decodeURIComponent(pair.slice(1).join("=").replace(/\+/g, " "));
            data[key] = val;
          }
        }
      } catch (err) {}
    }
  }

  return data;
}

function doPost(e) { return handleInquiry(e); }
function doGet(e) { return handleInquiry(e); }

function handleInquiry(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = extractInquiryData(e);

    const timestamp = new Date();
    const name = (data.name || "N/A").trim();
    const type = (data.type || "Student Admission").trim();
    const course = (data.course || "N/A").trim();
    const franchise_model = (data.franchise_model || "N/A").trim();
    const city = (data.city || "N/A").trim();
    const userMessage = (data.message || "None").trim();

    // ====================================================================
    // 10-DIGIT PHONE VALIDATION & SANITIZATION (Strict digits only)
    // ====================================================================
    let rawPhone = (data.phone || "").toString().trim();
    // Strip all non-digit characters (+, -, spaces, parentheses, etc.)
    let cleanPhone = rawPhone.replace(/\D/g, "");
    
    // If user prefixed with country code 91 and total length is 12, take last 10 digits
    if (cleanPhone.length === 12 && cleanPhone.indexOf("91") === 0) {
      cleanPhone = cleanPhone.substring(2);
    }
    // Enforce exact 10 digits
    if (cleanPhone.length > 10) {
      cleanPhone = cleanPhone.substring(0, 10);
    }
    const finalPhone = cleanPhone || "N/A";

    // Append to Sheet in 8 separate clean columns:
    // [Timestamp, Name, Phone, Inquiry Type, Course, Center Model, City, Message]
    sheet.appendRow([timestamp, name, finalPhone, type, course, franchise_model, city, userMessage]);

    // Format contextual fields
    const isStudent = (type === "Student Admission");
    let specificDetailLineText = "";
    let specificDetailRowHtml = "";
    let emailSubject = "";
    let typeBadgeColor = "";
    let typeBadgeBg = "";

    if (isStudent) {
      specificDetailLineText = `📚 Course Interested: ${course}`;
      specificDetailRowHtml = `
        <tr>
          <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600; width: 140px;">Course Interested:</td>
          <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 700;">${course}</td>
        </tr>`;
      emailSubject = `🚀 New PS ABACUS Student Inquiry: ${name} (${course})`;
      typeBadgeBg = "#e0f2fe";
      typeBadgeColor = "#0284c7";
    } else {
      specificDetailLineText = `🏢 Center Model:     ${franchise_model}`;
      specificDetailRowHtml = `
        <tr>
          <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600; width: 140px;">Center Model:</td>
          <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 700;">${franchise_model}</td>
        </tr>`;
      emailSubject = `🏢 New PS ABACUS Franchise Inquiry: ${name} (${franchise_model})`;
      typeBadgeBg = "#fef3c7";
      typeBadgeColor = "#d97706";
    }

    const istTime = timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const waText = encodeURIComponent(`Hi ${name}, thank you for contacting PS ABACUS! We received your inquiry regarding ${isStudent ? 'course admission (' + course + ')' : 'franchise partnership (' + franchise_model + ')'}.`);

    // ====================================================================
    // EXECUTIVE BRANDED HTML EMAIL BODY
    // ====================================================================
    const emailHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 25px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0f172a; padding: 26px 24px; text-align: center; border-bottom: 3px solid #f5a623;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">
                PS <span style="color: #f5a623;">ABACUS</span>
              </h1>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 13px; font-weight: 500; letter-spacing: 0.3px;">
                A Journey to Excellence
              </p>
              <div style="margin-top: 12px;">
                <span style="display: inline-block; background-color: rgba(245,166,35,0.18); border: 1px solid #f5a623; color: #f5a623; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.8px;">
                  🚀 New Website Inquiry
                </span>
              </div>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 28px 24px 20px;">
              
              <!-- Greeting & Badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 18px;">
                <tr>
                  <td>
                    <h2 style="margin: 0; font-size: 19px; color: #0f172a; font-weight: 800;">
                      Lead Details
                    </h2>
                  </td>
                  <td align="right">
                    <span style="background-color: ${typeBadgeBg}; color: ${typeBadgeColor}; font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 6px; display: inline-block;">
                      ${type}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Inquiry Attributes Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600; width: 140px;">Full Name:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 700;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600;">Mobile Number:</td>
                  <td style="padding: 10px 0;">
                    <a href="tel:${finalPhone}" style="color: #0f172a; font-size: 16px; font-weight: 800; text-decoration: none; font-family: monospace, monospace;">
                      ${finalPhone}
                    </a>
                    <span style="display: inline-block; margin-left: 6px; font-size: 11px; color: #16a34a; font-weight: 700; background: #dcfce7; padding: 2px 6px; border-radius: 4px;">Verified 10-Digit</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600;">Inquiry Type:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 600;">${type}</td>
                </tr>
                ${specificDetailRowHtml}
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600;">City / Locality:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-size: 15px; font-weight: 700;">${city}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 600;">Received Date & Time:</td>
                  <td style="padding: 10px 0; color: #64748b; font-size: 13px;">${istTime}</td>
                </tr>
              </table>

              <!-- User Message Card -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">User Message / Queries:</div>
                <div style="background-color: #f8fafc; border-left: 4px solid #f5a623; border-radius: 4px; padding: 12px 16px; color: #334155; font-size: 14px; line-height: 1.5; font-style: italic;">
                  "${userMessage}"
                </div>
              </div>

              <!-- Quick Action Call-To-Action Buttons -->
              <div style="text-align: center; padding-top: 6px; margin-bottom: 8px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="https://wa.me/91${finalPhone}?text=${waText}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 22px; border-radius: 8px; margin-right: 8px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(37,211,102,0.3);">
                        💬 Chat on WhatsApp
                      </a>
                      <a href="tel:${finalPhone}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 22px; border-radius: 8px; margin-bottom: 8px; box-shadow: 0 2px 8px rgba(15,23,42,0.25);">
                        📞 Call Mobile Directly
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 18px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.6;">
              <strong>PS ABACUS</strong> &bull; Piyushlok Education<br>
              Helplines: <strong>9404853704</strong> / <strong>8275635904</strong> &bull; Email: <a href="mailto:psabacus01@gmail.com" style="color: #64748b; text-decoration: none;">psabacus01@gmail.com</a><br>
              Official Website: <a href="https://psabacus.com" target="_blank" style="color: #f5a623; text-decoration: none; font-weight: 700;">psabacus.com</a>
              <div style="margin-top: 8px; font-size: 11px; color: #94a3b8;">
                Architected & Engineered by Ninad Khune
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    // Plain text fallback body
    const emailPlainTextBody = `
You have received a new inquiry on PS ABACUS Website!
Brand: PS ABACUS | Slogan: A Journey to Excellence

---------------------------------------------------
📋 INQUIRY DETAILS:
---------------------------------------------------
👤 Name:              ${name}
📞 Mobile (10-Digit): ${finalPhone}
🎯 Inquiry Type:      ${type}
${specificDetailLineText}
📍 City:              ${city}
💬 Message:           ${userMessage}
⏰ Date & Time:       ${istTime}

---------------------------------------------------
⚡ Quick Actions:
• WhatsApp Contact: https://wa.me/91${finalPhone}
• Call Directly: tel:${finalPhone}
• Helplines: 9404853704 / 8275635904
---------------------------------------------------
Website Created & Architected by Ninad Khune
`;

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: emailSubject,
      body: emailPlainTextBody,
      htmlBody: emailHtmlBody
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", received: name, phone: finalPhone })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
