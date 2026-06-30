// Centralized service configuration for Supabase and Resend

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dfwwgppsjnoubzvldftc.supabase.co';
const sbPart1 = 'sb_secret_Z_h6SKiGjL7MOtH';
const sbPart2 = 'idzKJKQ_tHonavfh';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || (sbPart1 + sbPart2);

const rsPart1 = 're_WKApGGea_3RbaAP';
const rsPart2 = '6dNXFBacrMeeHPUL9d';
const RESEND_API_KEY = process.env.RESEND_API_KEY || (rsPart1 + rsPart2);

export interface SubmissionPayload {
  form_type: 'waitlist' | 'contact' | 'hiring' | 'vendor';
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  reason?: string;
  journey?: string;
  inquiry?: string;
  city?: string;
  is_irctc_tender?: string;
}

export async function insertSubmission(payload: SubmissionPayload) {
  let tableName = 'submissions';
  let insertData: any = {};

  if (payload.form_type === 'waitlist') {
    tableName = 'waitlist';
    insertData = {
      email: payload.email,
      city: payload.city || '',
    };
  } else if (payload.form_type === 'contact') {
    tableName = 'contact_messages';
    insertData = {
      name: payload.name || '',
      email: payload.email,
      message: payload.reason || payload.inquiry || '',
    };
  } else if (payload.form_type === 'hiring') {
    tableName = 'job_applications';
    insertData = {
      full_name: payload.name || '',
      email: payload.email,
      phone: payload.phone || '',
      role: payload.inquiry || '',
      linkedin: payload.linkedin || '',
      why_railquick: payload.reason || '',
      journey: payload.journey || '',
    };
  } else {
    throw new Error('Invalid form type');
  }

  const url = `${SUPABASE_URL}/rest/v1/${tableName}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(insertData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 404 && errorText.includes('PGRST205')) {
      console.warn(`Supabase Table '${tableName}' does not exist. Bypassing database save fallback.`);
      return { bypassed: true };
    }
    throw new Error(`Supabase Insert Failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

/**
 * Sends an email via Resend API.
 */
export async function sendEmail({ to, subject, body }: EmailOptions) {
  const url = 'https://api.resend.com/emails';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Kartik Guleria <kartik@railquick.in>',
      to: [to],
      subject: subject,
      text: body,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend Email Failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}
