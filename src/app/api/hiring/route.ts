import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, sendEmail } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, reason, linkedin, journey } = body;

    // Validation
    if (!name || !email || !reason || !linkedin) {
      return NextResponse.json(
        { success: false, message: 'Name, email, reason, and LinkedIn are required' },
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

    // 1. Insert into Supabase
    try {
      await insertSubmission({
        form_type: 'hiring',
        name: name,
        email: email,
        phone: phone || '',
        linkedin: linkedin,
        reason: reason,
        journey: journey || '',
      });
    } catch (dbError: any) {
      if (dbError.message?.includes('23505') || dbError.message?.includes('duplicate key')) {
        return NextResponse.json(
          { success: true, message: 'Application submitted successfully!' }
        );
      }
      throw dbError;
    }

    // 2. Send automatic email via Resend (failsafe)
    try {
      const emailBody = `Hi,

I'm Kartik Guleria, Founder & CEO of RailQuick.

Thank you for your interest in joining RailQuick.

We have successfully received your application and our team will carefully review your profile.

If your experience aligns with our current requirements, we will contact you regarding the next steps.

We appreciate your interest in building the future of train travel with us.

Regards,
Kartik Guleria
Founder & CEO
RailQuick`;

      await sendEmail({
        to: email,
        subject: 'Application Received - RailQuick',
        body: emailBody,
      });
    } catch (emailError) {
      console.error('Failed to send hiring email via Resend:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
    });

  } catch (error) {
    console.error('Hiring API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
