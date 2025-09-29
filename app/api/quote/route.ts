import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { calculateQuote, formatCurrency, getVanSizeDisplay, type VanSize } from '@/lib/pricing';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const QuoteRequestSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  pickupAddress: z.string().optional(),
  dropoffAddress: z.string().optional(),
  notes: z.string().optional(),
  quoteInputs: z.object({
    vanSize: z.enum(['small', 'medium', 'large']),
    loaders: z.number().min(0).max(3),
    hours: z.number().min(1).max(12),
    miles: z.number().min(0).max(100),
  }),
});

export async function POST(request: NextRequest) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validatedData = QuoteRequestSchema.parse(body);
    const { name, phone, pickupAddress, dropoffAddress, notes, quoteInputs } = validatedData;
    
    const breakdown = calculateQuote(quoteInputs);

    // Email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #FF8A00 0%, #FFA500 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Your Moving Quote</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Mudanzas Edyta London - "Lift on the way"</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Hello ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">Thank you for choosing Mudanzas Edyta London for your moving needs. Here's your personalized quote:</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #FF8A00; margin-top: 0;">Quote Breakdown</h3>
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
              <p style="margin: 5px 0;"><strong>Van Size:</strong> ${getVanSizeDisplay(quoteInputs.vanSize)}</p>
              <p style="margin: 5px 0;"><strong>Loaders:</strong> ${quoteInputs.loaders}</p>
              <p style="margin: 5px 0;"><strong>Hours:</strong> ${quoteInputs.hours} (Billable: ${breakdown.billableHours})</p>
              <p style="margin: 5px 0;"><strong>Distance:</strong> ${quoteInputs.miles} miles</p>
            </div>
            
            <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
              <p style="margin: 5px 0;">Van Rate: ${formatCurrency(breakdown.vanBaseHourly)}/hour</p>
              ${breakdown.loadersHourly > 0 ? `<p style="margin: 5px 0;">Loaders: ${formatCurrency(breakdown.loadersHourly)}/hour</p>` : ''}
              <p style="margin: 5px 0;">Labour Cost: ${formatCurrency(breakdown.baseHourly)} × ${breakdown.billableHours}h = ${formatCurrency(breakdown.baseHourly * breakdown.billableHours)}</p>
              <p style="margin: 5px 0;">Distance Charge: ${breakdown.distanceCharge === 0 ? 'FREE (≤10 miles)' : formatCurrency(breakdown.distanceCharge)}</p>
            </div>
            
            <div style="text-align: center; background: #FF8A00; color: white; padding: 15px; border-radius: 8px;">
              <h2 style="margin: 0; font-size: 32px;">TOTAL: ${formatCurrency(breakdown.total)}</h2>
            </div>
          </div>
          
          ${pickupAddress || dropoffAddress ? `
          <div style="margin: 20px 0;">
            <h4 style="color: #333;">Addresses:</h4>
            ${pickupAddress ? `<p style="margin: 5px 0;"><strong>Pickup:</strong> ${pickupAddress}</p>` : ''}
            ${dropoffAddress ? `<p style="margin: 5px 0;"><strong>Drop-off:</strong> ${dropoffAddress}</p>` : ''}
          </div>
          ` : ''}
          
          ${notes ? `
          <div style="margin: 20px 0;">
            <h4 style="color: #333;">Additional Notes:</h4>
            <p style="color: #666; background: #f8f9fa; padding: 15px; border-radius: 8px;">${notes}</p>
          </div>
          ` : ''}
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h4 style="color: #2d5a2d; margin-top: 0;">What's Included:</h4>
            <ul style="color: #2d5a2d; margin: 0; padding-left: 20px;">
              <li>Professional, DBS-checked team</li>
              <li>All equipment & protection materials</li>
              <li>Fully insured service</li>
              <li>No hidden fees or surprises</li>
              <li>Same-day availability</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <h3 style="color: #333;">Ready to Book?</h3>
            <div style="margin: 20px 0;">
              <a href="https://wa.me/447456507570?text=${encodeURIComponent(`Hi! I received my quote for ${formatCurrency(breakdown.total)}. I'd like to book my move.`)}" style="display: inline-block; background: #25D366; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px;">WhatsApp Us</a>
              <a href="tel:+447456507570" style="display: inline-block; background: #FF8A00; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px;">Call 07456 507 570</a>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p><strong>Mudanzas Edyta London Ltd</strong><br>
            Professional Removals • 10+ Years Experience • Bilingual Service<br>
            Available Mon-Sun: 8:00 AM - 8:00 PM</p>
          </div>
        </div>
      </div>
    `;

    // Email to business
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>New Quote Request - ${formatCurrency(breakdown.total)}</h2>
        
        <h3>Customer Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          ${pickupAddress ? `<li><strong>Pickup:</strong> ${pickupAddress}</li>` : ''}
          ${dropoffAddress ? `<li><strong>Drop-off:</strong> ${dropoffAddress}</li>` : ''}
        </ul>
        
        <h3>Quote Details:</h3>
        <ul>
          <li><strong>Van:</strong> ${getVanSizeDisplay(quoteInputs.vanSize)} (${formatCurrency(breakdown.vanBaseHourly)}/hour)</li>
          <li><strong>Loaders:</strong> ${quoteInputs.loaders} (${formatCurrency(breakdown.loadersHourly)}/hour)</li>
          <li><strong>Hours:</strong> ${quoteInputs.hours} requested, ${breakdown.billableHours} billable</li>
          <li><strong>Distance:</strong> ${quoteInputs.miles} miles (${formatCurrency(breakdown.distanceCharge)} charge)</li>
          <li><strong>Total:</strong> ${formatCurrency(breakdown.total)}</li>
        </ul>
        
        ${notes ? `<h3>Notes:</h3><p>${notes}</p>` : ''}
        
        <p><a href="https://wa.me/447456507570?text=${encodeURIComponent(`Hi ${name}! I received your quote request for ${formatCurrency(breakdown.total)}. Let's discuss your moving requirements.`)}">Contact via WhatsApp</a></p>
      </div>
    `;

    // Send customer email
    await resend.emails.send({
      from: 'Mudanzas Edyta London <quotes@mudanzasedytalondon.com>',
      to: [name.includes('@') ? name : `${name} <customer@example.com>`], // Fallback for demo
      subject: `Your Moving Quote - ${formatCurrency(breakdown.total)} | Mudanzas Edyta London`,
      html: customerEmailHtml,
    });

    // Send business notification
    await resend.emails.send({
      from: 'Website <quotes@mudanzasedytalondon.com>',
      to: ['info@mudanzasedytalondon.com'], // Business email
      subject: `New Quote Request - ${formatCurrency(breakdown.total)} from ${name}`,
      html: businessEmailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Quote sent successfully',
      total: breakdown.total 
    });

  } catch (error) {
    console.error('Quote API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send quote' },
      { status: 500 }
    );
  }
}










