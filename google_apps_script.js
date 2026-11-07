/**
 * ========================================================================
 *   PS ABACUS — Google Apps Script (Universal Lead Webhook & Email Engine)
 *   Architected by: Ninad Khune
 *   Brand: PS ABACUS | Slogan: A Journey to Excellence
 *   Helplines: 9404853704 / 8275635904 | Email: psabacus01@gmail.com
 * 
 *   HOW TO DEPLOY IN GOOGLE SHEETS:
 *   1. Open your Google Sheet in browser (e.g. "PS ABACUS Inquiries")
 *   2. Click: Extensions -> Apps Script
 *   3. Select all existing code, delete it, and paste this entire code.
 *   4. Click "Save" (Floppy Disk icon).
 *   5. Click "Deploy" (top right) -> "Manage deployments".
 *   6. Click the Pencil (Edit) icon next to your active deployment.
 *   7. Under "Version", select "New version".
 *   8. Click "Deploy".
 * ========================================================================
 */

// ========================================================================
// 1. RECIPIENT EMAIL(S) FOR INSTANT ALERTS:
// (You can list one email or multiple separated by comma)
// ========================================================================
const NOTIFICATION_EMAIL = "psabacus01@gmail.com";


/**
 * Helper: Universal parameter extractor that handles:
 * - Query parameters on URL (e.parameter)
 * - JSON body payloads (e.postData.contents)
 * - URL-encoded form data (e.postData.contents)
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

    // Check if it's JSON
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
      } catch (jsonErr) { }
    }

    // Check if it's URL-encoded string (key=value&key2=val2)
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
      } catch (urlErr) { }
    }
  }

  return data;
}

/**
 * Main Webhook Handler for POST requests from website
 */
function doPost(e) {
  return handleInquiry(e);
}

/**
 * Fallback handler for GET requests or test pings
 */
function doGet(e) {
  return handleInquiry(e);
}

function handleInquiry(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = extractInquiryData(e);

    const timestamp = new Date();
    const name = data.name || "N/A";
    const phone = data.phone || "N/A";
    const type = data.type || "Student Admission";
    const course = data.course || "N/A";
    const franchise_model = data.franchise_model || "N/A";
    const city = data.city || "N/A";
    const userMessage = data.message || "None";

    // Append to Sheet in 8 separate clean columns:
    // [Timestamp, Name, Phone, Inquiry Type, Course, Center Model, City, Message]
    sheet.appendRow([timestamp, name, phone, type, course, franchise_model, city, userMessage]);

    // Format email alert based on inquiry type
    let specificDetailLine = "";
    let emailSubject = "";

    if (type === "Student Admission") {
      specificDetailLine = `📚 Course Interested: ${course}`;
      emailSubject = `🚀 New PS ABACUS Student Inquiry: ${name} (${course})`;
    } else {
      specificDetailLine = `🏢 Center Model:     ${franchise_model}`;
      emailSubject = `🏢 New PS ABACUS Franchise Inquiry: ${name} (${franchise_model})`;
    }

    const cleanPhoneDigits = phone.toString().replace(/[^0-9]/g, "");

    const emailBody = `
You have received a new inquiry on PS ABACUS Website!
Brand: PS ABACUS
Slogan: A Journey to Excellence

---------------------------------------------------
📋 INQUIRY DETAILS:
---------------------------------------------------
👤 Name:              ${name}
📞 Phone:             ${phone}
🎯 Inquiry Type:      ${type}
${specificDetailLine}
📍 City:              ${city}
💬 Message:           ${userMessage}
⏰ Date & Time:       ${timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

---------------------------------------------------
⚡ Quick Actions:
• WhatsApp Contact: https://wa.me/91${cleanPhoneDigits}
• Call Directly: tel:${cleanPhoneDigits}
---------------------------------------------------
Website Created & Architected by Ninad Khune
`;

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: emailSubject,
      body: emailBody
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", received: name })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
