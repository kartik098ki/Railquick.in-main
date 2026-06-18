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
This email confirms that we have successfully received your message.
Our team will review your inquiry and respond as soon as possible.
No further action is required from your side at this time.
Thank you.

Regards,
Kartik Guleria
Founder & CEO
RailQuick`;

      await sendEmail({
        to: email,
        subject: "Message Received – RailQuick",
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
