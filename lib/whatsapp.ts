import { QuoteBreakdown, QuoteInputs, formatCurrency, getVanSizeDisplay } from './pricing';

export interface QuoteFormData {
  name?: string;
  phone?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  notes?: string;
}

/**
 * Generate WhatsApp message URL with quote summary
 */
export function generateWhatsAppURL(
  inputs: QuoteInputs,
  breakdown: QuoteBreakdown,
  formData: QuoteFormData = {}
): string {
  const { name, phone, pickupAddress, dropoffAddress, notes } = formData;
  
  let message = `🚚 *QUOTE REQUEST - Mudanzas Edyta London*\n\n`;
  
  // Customer details
  if (name) message += `👤 *Name:* ${name}\n`;
  if (phone) message += `📞 *Phone:* ${phone}\n\n`;
  
  // Quote details
  message += `📋 *QUOTE BREAKDOWN*\n`;
  message += `🚐 *Van Size:* ${getVanSizeDisplay(inputs.vanSize)}\n`;
  message += `👷 *Loaders:* ${inputs.loaders}\n`;
  message += `⏰ *Requested Hours:* ${inputs.hours}\n`;
  message += `⏰ *Billable Hours:* ${breakdown.billableHours} (${breakdown.billableHours === 2 ? '2hr minimum' : 'as requested'})\n`;
  message += `📍 *Distance:* ${inputs.miles} miles\n\n`;
  
  // Pricing breakdown
  message += `💰 *PRICING BREAKDOWN*\n`;
  message += `• Van (${getVanSizeDisplay(inputs.vanSize)}): ${formatCurrency(breakdown.vanBaseHourly)}/hour\n`;
  if (breakdown.loadersHourly > 0) {
    message += `• Loaders (${inputs.loaders} × ${formatCurrency(25)}): ${formatCurrency(breakdown.loadersHourly)}/hour\n`;
  }
  message += `• Hourly Rate: ${formatCurrency(breakdown.baseHourly)}/hour\n`;
  message += `• Labour Cost: ${formatCurrency(breakdown.baseHourly)} × ${breakdown.billableHours}h = ${formatCurrency(breakdown.baseHourly * breakdown.billableHours)}\n`;
  
  if (breakdown.distanceCharge > 0) {
    message += `• Distance Charge: ${inputs.miles} miles × ${formatCurrency(1.5)} = ${formatCurrency(breakdown.distanceCharge)}\n`;
  } else {
    message += `• Distance Charge: FREE (≤10 miles)\n`;
  }
  
  message += `\n🎯 *TOTAL: ${formatCurrency(breakdown.total)}*\n\n`;
  
  // Addresses
  if (pickupAddress || dropoffAddress) {
    message += `📍 *ADDRESSES*\n`;
    if (pickupAddress) message += `📤 *Pickup:* ${pickupAddress}\n`;
    if (dropoffAddress) message += `📥 *Drop-off:* ${dropoffAddress}\n\n`;
  }
  
  // Notes
  if (notes) {
    message += `📝 *Notes:* ${notes}\n\n`;
  }
  
  message += `✅ Please confirm this quote and let me know your preferred moving date and time!\n\n`;
  message += `🌟 *Why choose Mudanzas Edyta London?*\n`;
  message += `• 10+ years experience\n`;
  message += `• DBS-checked, friendly team\n`;
  message += `• Bilingual service (EN/ES)\n`;
  message += `• Same-day options available\n`;
  message += `• Fully insured & reliable\n\n`;
  message += `"Lift on the way" 🚀`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/447456507570?text=${encodedMessage}`;
}

/**
 * Format phone number for WhatsApp
 */
export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 44
  if (digits.startsWith('0')) {
    return '44' + digits.slice(1);
  }
  
  // If starts with 44, keep as is
  if (digits.startsWith('44')) {
    return digits;
  }
  
  // Otherwise assume UK number and add 44
  return '44' + digits;
}



