import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, sendEmail } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
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
        form_type: 'waitlist',
        name: name || '',
        email: email,
      });
    } catch (dbError: any) {
      if (dbError.message.includes('23505') || dbError.message.includes('duplicate key')) {
        return NextResponse.json(
          { success: true, message: "You're already on the waitlist! We'll be in touch soon." }
        );
      }
      throw dbError;
    }

    // 2. Send automatic email via Resend (failsafe)
    try {
      const emailBody = `Hi,
Thank you for registering with RailQuick.
We have successfully received your registration.
At RailQuick, we are building a faster and more convenient way for train passengers to access essential products directly at their seat. We are currently conducting pilot operations and refining the experience before our official launch.
Your registration has been recorded, and you will be among the first to receive important updates as we progress.
We appreciate your trust in RailQuick and look forward to serving you soon.

Warm Regards,
Kartik Guleria
Founder & CEO
RailQuick`;

      await sendEmail({
        to: email,
        subject: "RailQuick Registration Confirmation",
        body: emailBody,
      });
    } catch (emailError) {
      console.error('Failed to send waitlist email via Resend:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Welcome to RailQuick.",
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
