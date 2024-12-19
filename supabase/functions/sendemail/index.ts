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
  
  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] Handling CORS preflight request`);
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log(`[${requestId}] Parsing request body`);
    const { formData, analysis, pdfBase64, subject }: EmailRequest = await req.json();
    
    console.log(`[${requestId}] Request validation:`, {
      hasFormData: !!formData,
      formDataEmail: formData?.email,
      hasAnalysis: !!analysis,
      hasPdfBase64: !!pdfBase64,
      pdfBase64Length: pdfBase64?.length || 0,
      subject
    });

    if (!formData?.email || !pdfBase64) {
      throw new Error("Missing required email data");
    }

    console.log(`[${requestId}] Cleaning PDF base64 data`);
    const cleanBase64 = pdfBase64.replace(/^data:image\/png;base64,/, '');
    
    console.log(`[${requestId}] PDF data validation:`, {
      originalLength: pdfBase64.length,
      cleanedLength: cleanBase64.length,
    });

    if (cleanBase64.length === 0) {
      throw new Error("Invalid PDF data after cleaning");
    }

    const attachmentId = crypto.randomUUID();
    console.log(`[${requestId}] Generated attachment ID:`, attachmentId);

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
          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI%20Implementation%20Demo&details=Demo%20session%20for%20${encodeURIComponent(formData.companyName)}"
             style="display: inline-block; background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-right: 16px;">
            Add to Calendar
          </a>
          
          <a href="data:application/pdf;base64,${cleanBase64}"
             download="analysis-report.pdf"
             style="display: inline-block; background-color: #34d399; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Download Report
          </a>
        </div>
        
        <p style="margin-top: 32px;">We look forward to discussing these opportunities with you during the demo!</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
          <p>This is an automated message, please do not reply directly to this email.</p>
        </div>
      </div>
    `;

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
          filename: 'analysis-report.png',
          content: cleanBase64,
          type: 'image/png',
          disposition: 'attachment'
        }]
      }),
    });

    const responseText = await res.text();
    console.log(`[${requestId}] Resend API response:`, {
      status: res.status,
      statusText: res.statusText,
      body: responseText
    });

    if (!res.ok) {
      throw new Error(`Resend API error: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log(`[${requestId}] Email sent successfully:`, {
      messageId: data.id,
      recipient: formData.email
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(`[${requestId}] Error:`, {
      message: error.message,
      stack: error.stack
    });
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);