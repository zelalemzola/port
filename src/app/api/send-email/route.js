import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { name, email, subject, projectType, message, to } = await request.json()

    // Validate required fields
    if (!name || !email || !message || !to) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `Portfolio Contact: ${subject || "New message from your website"}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Project Type: ${projectType || "Not specified"}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name} (${email})</p>
  <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 5px;">
    <h3 style="margin-top: 0;">Message:</h3>
    <p style="white-space: pre-line;">${message}</p>
  </div>
  <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
    This email was sent from your portfolio website contact form.
  </p>
</div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)

    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 })
  }
}

