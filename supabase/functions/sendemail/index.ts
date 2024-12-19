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
    console.log("[Step 1] Starting email process...");
    const { formData, analysis, pdfBase64, subject }: EmailRequest = await req.json();
    
    if (!formData?.email || !pdfBase64) {
      console.error("[Validation Error] Missing required data:", { 
        hasEmail: !!formData?.email, 
        hasPDF: !!pdfBase64 
      });
      throw new Error("Missing required email data");
    }
    
    console.log("[Step 2] Validating recipient:", formData.email);
    
    // Generate a unique ID for the attachment
    const attachmentId = crypto.randomUUID();
    console.log("[Step 3] Generated attachment ID:", attachmentId);

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

    console.log("[Step 4] Preparing email template with attachment reference");
    
    // Clean and validate the base64 data
    const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
    console.log("[Step 5] Cleaned base64 data, length:", cleanBase64.length);
    
    if (cleanBase64.length === 0) {
      console.error("[Error] Empty PDF data after cleaning");
      throw new Error("Invalid PDF data");
    }

    console.log("[Step 6] Sending email via Resend API");
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

    if (res.ok) {
      const data = await res.json();
      console.log("[Success] Email sent successfully:", data);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error("[API Error] Resend API error:", error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("[Fatal Error] Error in sendemail function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);