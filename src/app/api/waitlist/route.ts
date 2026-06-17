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

I'm Kartik Guleria, Founder & CEO of RailQuick.

Thank you for joining the RailQuick waitlist.

We're building India's first on-seat essentials delivery platform for train passengers. We are currently conducting pilot testing and preparing for launch.

As an early supporter, you'll be among the first to receive product updates, early access opportunities, and launch announcements.

Thank you for being part of our journey.

Regards,
Kartik Guleria
Founder & CEO
RailQuick`;

      await sendEmail({
        to: email,
        subject: "You're on the RailQuick Waitlist 🚆",
        body: emailBody,
      });
    } catch (emailError) {
      console.error('Failed to send waitlist email via Resend:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: "🎉 Welcome aboard! You've been added to our waitlist.",
    });

  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
