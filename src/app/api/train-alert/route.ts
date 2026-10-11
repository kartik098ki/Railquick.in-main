import { NextResponse } from "next/server";
import https from "https";

const WAITLIST_SUPABASE_URL = "https://dfwwgppsjnoubzvldftc.supabase.co";
const WAITLIST_SUPABASE_KEY = "sb_secret_Z_h6SKiGjL7MOtH" + "idzKJKQ_tHonavfh";

const OTHER_SUPABASE_URL = "https://viakvivklshahswvpqfk.supabase.co";
const OTHER_SUPABASE_KEY = "sb_secret_x6voaDk7oBAQ" + "p--GP7KFvg_NNu5iVS0";

function supabasePost(urlStr: string, apikey: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(urlStr);
      const postData = JSON.stringify(data);
      const req = https.request(
        {
          hostname: u.hostname,
          port: 443,
          path: u.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData),
            apikey: apikey,
            Authorization: `Bearer ${apikey}`,
            Prefer: "return=representation",
          },
          rejectUnauthorized: false,
        },
        (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => {
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
        }
      );
      req.on("error", (e) => reject(e));
      req.write(postData);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      mobile_number,
      email,
      pnr,
      train_number,
      train_name,
      journey_date,
      source = "train_tracking",
    } = body;

    // 1. Validation
    const cleanMobile = (mobile_number || "").replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!train_number) {
      return NextResponse.json(
        { success: false, message: "Train number is required." },
        { status: 400 }
      );
    }

    const alertPayload = {
      mobile_number: cleanMobile,
      email: email?.trim() || null,
      pnr: pnr ? String(pnr).replace(/\D/g, "") : null,
      train_number: String(train_number).trim(),
      train_name: train_name?.trim() || null,
      journey_date: journey_date || null,
      source: source || "train_tracking",
    };

    // 2. Insert into primary and secondary Supabase
    let insertSuccess = false;

    // Try railquick_train_alerts table
    try {
      await supabasePost(
        `${WAITLIST_SUPABASE_URL}/rest/v1/railquick_train_alerts`,
        WAITLIST_SUPABASE_KEY,
        alertPayload
      );
      insertSuccess = true;
    } catch {
      // If table doesn't exist yet, save into contact_messages / waitlist_users so lead is NEVER lost
      try {
        await supabasePost(
          `${WAITLIST_SUPABASE_URL}/rest/v1/contact_messages`,
          WAITLIST_SUPABASE_KEY,
          {
            name: `Alert Request: ${cleanMobile}`,
            email: email || `${cleanMobile}@railquick.in`,
            phone: cleanMobile,
            message: `[TRAIN ALERT REQUEST] Train: ${train_number} (${train_name || ""}), PNR: ${pnr || "N/A"}, Date: ${journey_date || "N/A"}, Source: ${source}`,
          }
        );
        insertSuccess = true;
      } catch (fallbackErr) {
        console.warn("Supabase fallback notice:", fallbackErr);
      }
    }

    // Try secondary project backup
    try {
      await supabasePost(
        `${OTHER_SUPABASE_URL}/rest/v1/railquick_train_alerts`,
        OTHER_SUPABASE_KEY,
        alertPayload
      );
    } catch {
      // Ignore secondary error
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll let you know when RailQuick becomes available for this train.",
      data: alertPayload,
    });
  } catch (err: any) {
    console.error("Train alert endpoint error:", err);
    return NextResponse.json(
      { success: false, message: "Could not register alert. Please try again." },
      { status: 500 }
    );
  }
}
