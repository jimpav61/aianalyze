import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  formData: {
    email: string;
    companyName: string;
    [key: string]: any;
  };
  analysis: {
    industry: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
  pdfBase64: string;
  subject: string;
}

const handler = async (req: Request): Promise<Response> => {
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Email Function Started - ${new Date().toISOString()}`);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] Handling CORS preflight request`);
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log(`[${requestId}] Parsing request body`);
    const { formData, analysis, pdfBase64, subject }: EmailRequest = await req.json();
    
    // Log input validation
    console.log(`[${requestId}] Input validation:`, {
      hasEmail: !!formData?.email,
      emailValue: formData?.email,
      hasCompanyName: !!formData?.companyName,
      companyName: formData?.companyName,
      hasPdfData: !!pdfBase64,
      pdfDataLength: pdfBase64?.length || 0,
      hasAnalysis: !!analysis,
      subject
    });

    if (!formData?.email || !pdfBase64) {
      throw new Error("Missing required email data");
    }

    // Clean and validate PDF data
    console.log(`[${requestId}] Cleaning PDF base64 data`);
    const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
    
    console.log(`[${requestId}] PDF data validation:`, {
      originalLength: pdfBase64.length,
      cleanedLength: cleanBase64.length,
      firstBytes: cleanBase64.substring(0, 20) // Log start of PDF data
    });

    if (cleanBase64.length === 0) {
      throw new Error("Invalid PDF data after cleaning");
    }

    // Generate attachment ID
    const attachmentId = crypto.randomUUID();
    console.log(`[${requestId}] Generated attachment ID:`, attachmentId);

    // Prepare email HTML
    console.log(`[${requestId}] Preparing email template`);
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Demo Booking Confirmation</h1>
        <p>Dear ${formData.companyName},</p>
        <p>Thank you for booking a demo with us! Your detailed analysis report is attached to this email.</p>
        
        <h2 style="color: #333; margin-top: 24px;">Quick Summary:</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 8px 0;">Industry: ${analysis.industry}</li>
          <li style="margin: 8px 0;">Potential Savings: $${analysis.savings.toLocaleString()}</li>
          <li style="margin: 8px 0;">Projected Profit Increase: ${analysis.profit_increase}%</li>
        </ul>
        
        <div style="margin: 32px 0; text-align: center;">
          <table role="presentation" style="border-collapse: separate; width: 100%; max-width: 400px; margin: 0 auto;">
            <tr>
              <td style="padding: 10px;">
                <a href="#" 
                   style="display: inline-block; background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; width: 100%; text-align: center; box-sizing: border-box;">
                  Add to Calendar
                </a>
              </td>
              <td style="padding: 10px;">
                <a href="cid:${attachmentId}" 
                   style="display: inline-block; background-color: #f65228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; width: 100%; text-align: center; box-sizing: border-box;">
                  Download Report
                </a>
              </td>
            </tr>
          </table>
        </div>
        
        <p style="margin-top: 32px;">We look forward to discussing these opportunities with you during the demo!</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
          <p>This is an automated message, please do not reply directly to this email.</p>
        </div>
      </div>
    `;

    // Log email preparation details
    console.log(`[${requestId}] Email preparation:`, {
      recipient: formData.email,
      subject,
      hasHtmlContent: !!emailHtml,
      attachmentId,
      attachmentSize: cleanBase64.length
    });

    // Send email via Resend API
    console.log(`[${requestId}] Sending email via Resend API`);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Acme <onboarding@resend.dev>",
        to: [formData.email],
        subject: subject,
        html: emailHtml,
        attachments: [{
          filename: 'analysis-report.pdf',
          content: cleanBase64,
          type: 'application/pdf',
          disposition: 'attachment',
          contentId: attachmentId
        }]
      }),
    });

    // Handle API response
    const responseText = await res.text();
    console.log(`[${requestId}] Resend API response:`, {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      body: responseText
    });

    if (res.ok) {
      const data = JSON.parse(responseText);
      console.log(`[${requestId}] Email sent successfully:`, {
        messageId: data.id,
        recipient: formData.email,
        timestamp: new Date().toISOString()
      });
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      console.error(`[${requestId}] Resend API error:`, responseText);
      throw new Error(`Resend API error: ${responseText}`);
    }
  } catch (error: any) {
    console.error(`[${requestId}] Fatal error:`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);