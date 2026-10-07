import nodemailer from "nodemailer";
import { LOGO_CID, renderTeamNotification } from "../emails/contact-templates";
import { LOGO_PNG_BASE64 } from "../emails/logo";

// Sends contact form submissions to our own mailbox over SMTP.
// Required env vars (set in Netlify > Site configuration > Environment variables):
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// Optional:
//   CONTACT_TO    - where enquiries are delivered (default: info@izyane.com)
//   CONTACT_FROM  - sender address (default: SMTP_USER)

const SUBJECT_LABELS: Record<string, string> = {
  "web-development": "Web Development",
  "mobile-apps": "Mobile Apps",
  "cloud-solutions": "Cloud Solutions",
  "ai-ml": "AI & Machine Learning",
  "consulting": "Consulting",
  "other": "Other",
};

const LIMITS = { name: 100, email: 254, company: 150, message: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Strip line breaks so user input can't inject extra mail headers.
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json(400, { error: "Invalid request body" });
  }

  // Honeypot: real users never see this field. Pretend success so bots move on.
  if (typeof data.botField === "string" && data.botField.length > 0) {
    return json(200, { ok: true });
  }

  const str = (key: string) => (typeof data[key] === "string" ? (data[key] as string).trim() : "");
  const name = singleLine(str("name"));
  const email = singleLine(str("email"));
  const company = singleLine(str("company"));
  const subject = str("subject");
  const message = str("message");

  if (!name || !email || !subject || !message || data.consent !== true) {
    return json(400, { error: "Please fill in all required fields and accept the terms." });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json(400, { error: "Please enter a valid email address." });
  }
  if (!(subject in SUBJECT_LABELS)) {
    return json(400, { error: "Please select a valid subject." });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    company.length > LIMITS.company ||
    message.length > LIMITS.message
  ) {
    return json(400, { error: "One or more fields are too long." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not configured");
    return json(500, { error: "Email service is not configured." });
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = process.env.CONTACT_TO || "info@izyane.com";
  const from = process.env.CONTACT_FROM || SMTP_USER;
  const notification = renderTeamNotification({
    name,
    email,
    company,
    subjectLabel: SUBJECT_LABELS[subject],
    message,
    receivedAt: new Date(),
  });

  try {
    await transporter.sendMail({
      from: `"iZyane Website" <${from}>`,
      to,
      replyTo: { name, address: email },
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
      attachments: [
        { filename: "izyane-logo.png", content: LOGO_PNG_BASE64, encoding: "base64", cid: LOGO_CID },
      ],
    });
  } catch (error) {
    console.error("Contact form: failed to send email", error);
    return json(502, { error: "Failed to send message. Please try again or contact us directly." });
  }

  return json(200, { ok: true });
};

export const config = { path: "/api/contact" };
