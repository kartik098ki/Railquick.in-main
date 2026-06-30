import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, sendEmail } from '@/lib/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, reason, linkedin, journey } = body;

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
        inquiry: role || '',
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
This email confirms that we have successfully received your application.
Your application has been recorded and will be reviewed by our team.
If additional information is required or if your application is selected for the next stage, we will contact you using the details provided.
No further action is required at this time.
Thank you.

Regards,
RailQuick Team`;

      await sendEmail({
        to: email,
        subject: 'Your Application Has Been Received',
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
