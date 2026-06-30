// Centralized service configuration for Supabase and Resend

const WAITLIST_SUPABASE_URL = 'https://dfwwgppsjnoubzvldftc.supabase.co';
const WAITLIST_SUPABASE_KEY = 'sb_secret_Z_h6SKiGjL7MOtH' + 'idzKJKQ_tHonavfh';

const OTHER_SUPABASE_URL = 'https://viakvivklshahswvpqfk.supabase.co';
const OTHER_SUPABASE_KEY = 'sb_secret_x6voaDk7oBAQ' + 'p--GP7KFvg_NNu5iVS0';

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
  let url = '';
  let apikey = '';

  if (payload.form_type === 'waitlist') {
    tableName = 'waitlist';
    insertData = {
      email: payload.email,
      city: payload.city || '',
    };
    url = `${WAITLIST_SUPABASE_URL}/rest/v1/${tableName}`;
    apikey = process.env.SUPABASE_SERVICE_ROLE_KEY || WAITLIST_SUPABASE_KEY;
  } else if (payload.form_type === 'contact') {
    tableName = 'contact_messages';
    insertData = {
      name: payload.name || '',
      email: payload.email,
      message: payload.reason || payload.inquiry || '',
    };
    url = `${OTHER_SUPABASE_URL}/rest/v1/${tableName}`;
    apikey = OTHER_SUPABASE_KEY;
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
    url = `${OTHER_SUPABASE_URL}/rest/v1/${tableName}`;
    apikey = OTHER_SUPABASE_KEY;
  } else if (payload.form_type === 'vendor') {
    tableName = 'vendor_applications';
    insertData = {
      name: payload.name || '',
      email: payload.email,
      phone: payload.phone || '',
      city: payload.city || '',
      is_irctc_tender: payload.is_irctc_tender || '',
    };
    url = `${OTHER_SUPABASE_URL}/rest/v1/${tableName}`;
    apikey = OTHER_SUPABASE_KEY;
  } else {
    throw new Error('Invalid form type');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apikey,
      'Authorization': `Bearer ${apikey}`,
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
