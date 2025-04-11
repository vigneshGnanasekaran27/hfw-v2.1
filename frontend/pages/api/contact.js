import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the public logo URL
const LOGO_URL = "https://hopefitwellness.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.82bc1eaa.png&w=96&q=75"; // Replace with your actual hosted logo URL


// Email template for user confirmation
const userConfirmationTemplate = ({ name, module, description, mobile, place }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HopeFit Wellness Inquiry Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; background-color: #f9f9f9;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 20px auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td align="center" style="padding: 30px 0 20px 0; background: linear-gradient(135deg, #f7faff 0%, #e2f0ff 100%); border-radius: 8px 8px 0 0;">
        <img src="${LOGO_URL}" alt="HopeFit Wellness Logo" style="max-width: 120px; height: auto;">
        <h2 style="margin: 15px 0 0 0; color: #2a70b8; font-weight: 600;">HopeFit Wellness</h2>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding: 30px 40px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              <h2 style="margin: 0 0 20px 0; color: #2a70b8; font-weight: 500; text-align: center;">Inquiry Confirmation</h2>
              <p style="margin: 0 0 15px; font-size: 16px; line-height: 24px;">Dear <span style="font-weight: 600;">${name}</span>,</p>
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 24px;">Thank you for reaching out to HopeFit Wellness! We're excited to help you on your wellness journey.</p>
              
              <div style="background-color: #f2f8ff; border-left: 4px solid #2a70b8; padding: 20px; margin-bottom: 25px; border-radius: 0 4px 4px 0;">
                <h3 style="margin: 0 0 15px 0; color: #2a70b8; font-size: 18px;">Your Inquiry Details</h3>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 15px; line-height: 22px;">
                  <tr>
                    <td width="140" style="padding: 5px 0; color: #555555; font-weight: 600;">Section:</td>
                    <td style="padding: 5px 0;">${module}</td>
                  </tr>
                  ${place ? `
                  <tr>
                    <td width="140" style="padding: 5px 0; color: #555555; font-weight: 600;">Location:</td>
                    <td style="padding: 5px 0;">${place}</td>
                  </tr>
                  ` : ""}
                  ${mobile ? `
                  <tr>
                    <td width="140" style="padding: 5px 0; color: #555555; font-weight: 600;">Mobile Number:</td>
                    <td style="padding: 5px 0;">${mobile}</td>
                  </tr>
                  ` : ""}
                  ${description ? `
                  <tr>
                    <td width="140" style="padding: 10px 0 5px; color: #555555; font-weight: 600; vertical-align: top;">Your Message:</td>
                    <td style="padding: 10px 0 5px;">${description}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>
              
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 24px;">Our team will review your inquiry and get back to you as soon as possible. We typically respond within 24-48 hours.</p>
              
              <p style="margin: 0; font-size: 16px; line-height: 24px;">Best regards,</p>
              <p style="margin: 5px 0 0; font-size: 16px; line-height: 24px; font-weight: 600; color: #2a70b8;">The HopeFit Wellness Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 20px; background-color: #f2f8ff; font-size: 14px; color: #666666; border-radius: 0 0 8px 8px;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} HopeFit Wellness. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, phone, module, description, place } = req.body;

  // Validate required fields (place is now optional)
  if (!email || !module || !name) {
    return res.status(400).json({ message: "Name, Email, and Module are required" });
  }

  try {
    // Send user confirmation email
    const userEmailResponse = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Inquiry Received - ${module} Section`,
      html: userConfirmationTemplate({
        name,
        module,
        description: description || "",
        mobile: phone || null, // Map phone to mobile
        place: place || null,  // Make place optional
      }),
    });

    // Check if there was an error in the response
    if (userEmailResponse.error) {
      console.error("Email sending error:", userEmailResponse.error);
      return res.status(400).json({
        success: false,
        message: "Failed to deliver email",
        error: userEmailResponse.error
      });
    }

    // Return success response only if email was sent successfully
    return res.status(200).json({
      success: true,
      id: userEmailResponse.id,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message || "Unknown error",
    });
  }
}