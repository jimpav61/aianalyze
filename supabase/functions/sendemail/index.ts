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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received email request with PDF");
    const { formData, analysis, pdfBase64, subject }: EmailRequest = await req.json();

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
        
        <div style="margin: 32px 0;">
          <a href="#" 
             style="display: inline-block; background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-right: 16px; font-weight: bold;">
            Add to Calendar
          </a>
          <a href="data:application/pdf;base64,${pdfBase64}" 
             download="analysis-report.pdf" 
             style="display: inline-block; background-color: #f65228; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Download Report
          </a>
        </div>
        
        <p style="margin-top: 32px;">We look forward to discussing these opportunities with you during the demo!</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
          <p>This is an automated message, please do not reply directly to this email.</p>
        </div>
      </div>
    `;

    console.log("Sending email with PDF attachment");
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
          content: pdfBase64,
          type: 'application/pdf'
        }]
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Email sent successfully with PDF attachment");
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error("Error from Resend API:", error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in sendemail function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);