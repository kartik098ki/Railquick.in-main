import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, sendEmail } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, inquiry } = body;

    // Validation
    if (!name || !email || !inquiry) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
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
        form_type: 'contact',
        name: name,
        email: email,
        inquiry: inquiry,
      });
    } catch (dbError: any) {
      if (dbError.message?.includes('23505') || dbError.message?.includes('duplicate key')) {
        return NextResponse.json(
          { success: true, message: 'Message sent successfully!' }
        );
      }
      throw dbError;
    }

    // 2. Send automatic email via Resend (failsafe)
    try {
      const emailBody = `Hi,

I'm Kartik Guleria, Founder & CEO of RailQuick.

Thank you for reaching out to us.

Our team has received your message and will review it shortly. We will get back to you as soon as possible.

Regards,
Kartik Guleria
Founder & CEO
RailQuick`;

      await sendEmail({
        to: email,
        subject: "We've Received Your Message",
        body: emailBody,
      });
    } catch (emailError) {
      console.error('Failed to send contact email via Resend:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
