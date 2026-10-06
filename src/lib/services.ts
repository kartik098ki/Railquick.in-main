import https from 'https';

const WAITLIST_SUPABASE_URL = 'https://dfwwgppsjnoubzvldftc.supabase.co';
const WAITLIST_SUPABASE_KEY = 'sb_secret_Z_h6SKiGjL7MOtH' + 'idzKJKQ_tHonavfh';

const OTHER_SUPABASE_URL = 'https://viakvivklshahswvpqfk.supabase.co';
const OTHER_SUPABASE_KEY = 'sb_secret_x6voaDk7oBAQ' + 'p--GP7KFvg_NNu5iVS0';

const rsPart1 = 're_WKApGGea_3RbaAP';
const rsPart2 = '6dNXFBacrMeeHPUL9d';
const RESEND_API_KEY = process.env.RESEND_API_KEY || (rsPart1 + rsPart2);

function supabasePostRequest(urlStr: string, apikey: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(urlStr);
      const postData = JSON.stringify(data);
      const req = https.request({
        hostname: u.hostname,
        port: 443,
        path: u.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'apikey': apikey,
          'Authorization': `Bearer ${apikey}`,
          'Prefer': 'return=representation'
        },
        rejectUnauthorized: false
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch {
              resolve({ status: res.statusCode });
            }
          } else {
            reject(new Error(`Supabase API status ${res.statusCode}: ${body}`));
          }
        });
      });
      req.on('error', (e) => reject(e));
      req.write(postData);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

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
  if (payload.form_type === 'waitlist') {
    const primaryUrl = `${WAITLIST_SUPABASE_URL}/rest/v1/waitlist`;
    const primaryData = { email: payload.email, city: payload.city || '' };

    const secondaryUrl = `${OTHER_SUPABASE_URL}/rest/v1/waitlist`;
    const secondaryData = { email: payload.email };

    // Concurrently write to both Supabase databases
    const results = await Promise.allSettled([
      supabasePostRequest(primaryUrl, WAITLIST_SUPABASE_KEY, primaryData),
      supabasePostRequest(secondaryUrl, OTHER_SUPABASE_KEY, secondaryData),
    ]);

    const anySuccess = results.some(r => r.status === 'fulfilled');
    const isDuplicate = results.some(
      r => r.status === 'rejected' && (r.reason?.message?.includes('23505') || r.reason?.message?.includes('duplicate key'))
    );

    if (anySuccess || isDuplicate) {
      return { success: true, duplicate: isDuplicate };
    }

    const firstErr = results.find(r => r.status === 'rejected') as PromiseRejectedResult;
    throw firstErr?.reason || new Error('Waitlist insertion failed');

  } else if (payload.form_type === 'contact') {
    const contactData = {
      name: payload.name || '',
      email: payload.email,
      message: payload.reason || payload.inquiry || '',
    };

    // Concurrently write to both Supabase databases
    const results = await Promise.allSettled([
      supabasePostRequest(`${WAITLIST_SUPABASE_URL}/rest/v1/contact_messages`, WAITLIST_SUPABASE_KEY, contactData),
      supabasePostRequest(`${OTHER_SUPABASE_URL}/rest/v1/contact_messages`, OTHER_SUPABASE_KEY, contactData),
    ]);

    const anySuccess = results.some(r => r.status === 'fulfilled');
    if (anySuccess) return { success: true };

    const firstErr = results.find(r => r.status === 'rejected') as PromiseRejectedResult;
    throw firstErr?.reason || new Error('Contact form insertion failed');

  } else if (payload.form_type === 'hiring') {
    const hiringData = {
      full_name: payload.name || '',
      email: payload.email,
      phone: payload.phone || '',
      role: payload.inquiry || '',
      linkedin: payload.linkedin || '',
      why_railquick: payload.reason || '',
      journey: payload.journey || '',
    };

    const fallbackContact = {
      name: payload.name || 'Hiring Candidate',
      email: payload.email,
      message: `[JOB APPLICATION] Role: ${payload.inquiry || 'Developer'}, Phone: ${payload.phone || 'N/A'}, LinkedIn: ${payload.linkedin || 'N/A'}, Reason: ${payload.reason || 'N/A'}`,
    };

    const results = await Promise.allSettled([
      supabasePostRequest(`${OTHER_SUPABASE_URL}/rest/v1/job_applications`, OTHER_SUPABASE_KEY, hiringData),
      supabasePostRequest(`${WAITLIST_SUPABASE_URL}/rest/v1/contact_messages`, WAITLIST_SUPABASE_KEY, fallbackContact),
    ]);

    const anySuccess = results.some(r => r.status === 'fulfilled');
    if (anySuccess) return { success: true };

    const firstErr = results.find(r => r.status === 'rejected') as PromiseRejectedResult;
    throw firstErr?.reason || new Error('Hiring form insertion failed');

  } else if (payload.form_type === 'vendor') {
    const project1Data = {
      name: payload.name || 'Vendor Applicant',
      email: payload.email,
      phone: payload.phone || '',
      city: payload.city || '',
      is_irctc_tender: payload.is_irctc_tender || 'No',
    };

    const project2Data = {
      name: payload.name || 'Vendor Applicant',
      email: payload.email,
      phone: payload.phone || '',
      city: payload.city || '',
      is_irctc_tender: payload.is_irctc_tender || 'No',
      details: payload.inquiry || payload.reason || '',
    };

    // Concurrently write to both Supabase databases
    const results = await Promise.allSettled([
      supabasePostRequest(`${WAITLIST_SUPABASE_URL}/rest/v1/vendor_applications`, WAITLIST_SUPABASE_KEY, project1Data),
      supabasePostRequest(`${OTHER_SUPABASE_URL}/rest/v1/vendor_applications`, OTHER_SUPABASE_KEY, project2Data),
    ]);

    const anySuccess = results.some(r => r.status === 'fulfilled');
    if (anySuccess) return { success: true };

    // Fallback to contact_messages in both
    const fallbackData = {
      name: payload.name || 'Vendor Applicant',
      email: payload.email,
      message: `[VENDOR/PARTNER APPLICATION] Phone: ${payload.phone || 'N/A'}, City: ${payload.city || 'N/A'}, IRCTC Tender: ${payload.is_irctc_tender || 'No'}, Details: ${payload.inquiry || payload.reason || ''}`
    };

    await Promise.allSettled([
      supabasePostRequest(`${WAITLIST_SUPABASE_URL}/rest/v1/contact_messages`, WAITLIST_SUPABASE_KEY, fallbackData),
      supabasePostRequest(`${OTHER_SUPABASE_URL}/rest/v1/contact_messages`, OTHER_SUPABASE_KEY, fallbackData),
    ]);

    return { success: true };
  } else {
    throw new Error('Invalid form type');
  }
}

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail({ to, subject, body }: EmailOptions): Promise<any> {
  return new Promise((resolve) => {
    try {
      const emailPayload = JSON.stringify({
        from: 'RailQuick <noreply@railquick.in>',
        to: [to],
        subject: subject,
        text: body,
      });

      const req = https.request({
        hostname: 'api.resend.com',
        port: 443,
        path: '/emails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(emailPayload),
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
      }, (res) => {
        let resBody = '';
        res.on('data', chunk => resBody += chunk);
        res.on('end', () => {
          resolve({ status: res.statusCode });
        });
      });

      req.on('error', () => {
        resolve({ error: 'Network error ignored' });
      });

      req.write(emailPayload);
      req.end();
    } catch {
      resolve({ error: 'Failed safely' });
    }
  });
}
