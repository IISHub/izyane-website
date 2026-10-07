// HTML email templates for the contact form.
// Email clients (Outlook especially) ignore most modern CSS, so these use
// table layout and inline styles only.

export const LOGO_CID = "izyane-logo";

const SITE_URL = "https://izyane.com";

const BRAND = {
  primary: "#18689F",
  secondary: "#7A0003",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  surface: "#F8FAFC",
  background: "#F1F5F9",
};

const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export interface ContactEnquiry {
  name: string;
  email: string;
  company: string;
  subjectLabel: string;
  message: string;
  receivedAt: Date;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Lusaka",
  }).format(date) + " (CAT)";

const button = (href: string, label: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td bgcolor="${BRAND.primary}" style="border-radius:8px;">
        <a href="${href}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${FONT};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:8px;">${label}</a>
      </td>
    </tr>
  </table>`;

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:13px;color:${BRAND.muted};width:110px;vertical-align:top;">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};font-family:${FONT};font-size:15px;color:${BRAND.text};vertical-align:top;">${value}</td>
  </tr>`;

// Shared frame: logo header, brand stripe, white card, company footer.
const layout = ({ preheader, body }: { preheader: string; body: string }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>iZyane InovSolutions</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.background};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.background}">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
          <tr>
            <td align="left" style="padding:28px 40px 24px;">
              <a href="${SITE_URL}" target="_blank"><img src="cid:${LOGO_CID}" width="180" alt="iZyane InovSolutions" style="display:block;width:180px;height:auto;border:0;"></a>
            </td>
          </tr>
          <tr>
            <td style="padding:0;font-size:0;line-height:0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="70%" height="4" bgcolor="${BRAND.primary}" style="font-size:0;line-height:0;">&nbsp;</td>
                  <td width="30%" height="4" bgcolor="${BRAND.secondary}" style="font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 40px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td bgcolor="${BRAND.surface}" style="padding:24px 40px;border-top:1px solid ${BRAND.border};font-family:${FONT};font-size:12px;line-height:1.6;color:${BRAND.muted};">
              <strong style="color:${BRAND.text};">iZyane InovSolutions</strong> &middot; Ahead With Innovation<br>
              Engineering House, 3rd Floor, Kelvin Siwale Road, Lusaka, Zambia<br>
              <a href="tel:+260958169735" style="color:${BRAND.muted};text-decoration:none;">+260 958 169 735</a> &middot;
              <a href="mailto:info@izyane.com" style="color:${BRAND.muted};text-decoration:none;">info@izyane.com</a> &middot;
              <a href="${SITE_URL}" style="color:${BRAND.primary};text-decoration:none;">izyane.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// Sent to the iZyane team when someone submits the contact form.
export function renderTeamNotification(enquiry: ContactEnquiry): RenderedEmail {
  const name = escapeHtml(enquiry.name);
  const email = escapeHtml(enquiry.email);
  const company = enquiry.company ? escapeHtml(enquiry.company) : `<span style="color:${BRAND.muted};">Not provided</span>`;
  const subjectLabel = escapeHtml(enquiry.subjectLabel);
  const message = escapeHtml(enquiry.message).replace(/\n/g, "<br>");
  const received = formatDate(enquiry.receivedAt);
  const replyHref = `mailto:${encodeURIComponent(enquiry.email)}?subject=${encodeURIComponent(`Re: Your ${enquiry.subjectLabel} enquiry`)}`;

  const body = `
    <p style="margin:0 0 8px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${BRAND.secondary};">New website enquiry</p>
    <h1 style="margin:0 0 6px;font-family:${FONT};font-size:24px;line-height:1.3;font-weight:700;color:${BRAND.text};">${name} wants to talk about ${subjectLabel}</h1>
    <p style="margin:0 0 28px;font-family:${FONT};font-size:14px;color:${BRAND.muted};">${received}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;border-top:1px solid ${BRAND.border};">
      ${detailRow("Name", name)}
      ${detailRow("Email", `<a href="mailto:${email}" style="color:${BRAND.primary};text-decoration:none;">${email}</a>`)}
      ${detailRow("Company", company)}
      ${detailRow("Topic", `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background-color:#E8F1F8;color:${BRAND.primary};font-size:13px;font-weight:600;">${subjectLabel}</span>`)}
    </table>

    <p style="margin:0 0 10px;font-family:${FONT};font-size:13px;color:${BRAND.muted};">Message</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;">
      <tr>
        <td bgcolor="${BRAND.surface}" style="padding:20px 22px;border-left:4px solid ${BRAND.primary};border-radius:0 8px 8px 0;font-family:${FONT};font-size:15px;line-height:1.65;color:${BRAND.text};">${message}</td>
      </tr>
    </table>

    ${button(replyHref, `Reply to ${name}`)}
    <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;color:${BRAND.muted};">Or just hit reply &mdash; this email's reply-to is set to ${email}.</p>`;

  const text = [
    "NEW WEBSITE ENQUIRY",
    received,
    "",
    `Name:    ${enquiry.name}`,
    `Email:   ${enquiry.email}`,
    `Company: ${enquiry.company || "Not provided"}`,
    `Topic:   ${enquiry.subjectLabel}`,
    "",
    "Message:",
    enquiry.message,
    "",
    "Reply to this email to respond directly.",
  ].join("\n");

  return {
    subject: `New enquiry: ${enquiry.subjectLabel} – ${enquiry.name}`,
    html: layout({ preheader: `${enquiry.name} sent a message about ${enquiry.subjectLabel}.`, body }),
    text,
  };
}
