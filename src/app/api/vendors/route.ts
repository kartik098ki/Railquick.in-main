import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      owner_name,
      shop_name,
      email,
      phone,
      mobile_number,
      whatsapp_number,
      vendor_type,
      city,
      location_details,
      categories,
      fssai_gstin,
      payout_details,
      language,
      partner_id,
      isIrctcTender,
    } = body;

    const contactName = owner_name || name || shop_name || "Vendor Partner";
    const contactPhone = mobile_number || phone || "";
    const contactEmail = email || `${contactPhone || "vendor"}@railquick.partner`;

    // Validation: At least a name/shop and a phone/mobile must be provided
    if (!contactName || !contactPhone) {
      return NextResponse.json(
        { success: false, message: 'Owner / Shop name and mobile number are required' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    await insertSubmission({
      form_type: 'vendor',
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      city: city || location_details || '',
      is_irctc_tender: isIrctcTender ? "Yes" : "No",
      inquiry: `Shop: ${shop_name || 'N/A'}, Type: ${vendor_type || 'N/A'}, WhatsApp: ${whatsapp_number || 'N/A'}, Categories: ${categories || 'N/A'}, FSSAI: ${fssai_gstin || 'N/A'}, Payout: ${payout_details || 'N/A'}`,
    });

    return NextResponse.json({
      success: true,
      partner_id: partner_id || `RQ-VND-${Date.now()}`,
      message: 'Vendor application registered successfully!',
    });

  } catch (error) {
    console.error('Vendor API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
