import { NextRequest, NextResponse } from 'next/server';

import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'serversmtp-relay.sendinblue.com',
  port: 587,
  secure: true,
  auth: {
    user: 'nikitosminsk100@gmail.com',
    pass: 'C76PLpsRc2ZaMt8V'
  }
});

export async function POST(req: NextRequest, res: NextResponse) {
  await transporter.sendMail({
    to: 'nikitosminsk100@gmail.com',
    text: 'Hello',
    subject: 'Test',
    from: 'nikitosminsk100@gmail.com'
  });
  return NextResponse.json({ a: 5 });
}
