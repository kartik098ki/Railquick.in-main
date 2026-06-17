import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, city, isIrctcTender } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    await insertSubmission({
      form_type: 'vendor',
      name: name,
      email: email,
      phone: phone || '',
      city: city || '',
      is_irctc_tender: isIrctcTender ? "Yes" : "No",
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
    });

  } catch (error) {
    console.error('Vendor API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
