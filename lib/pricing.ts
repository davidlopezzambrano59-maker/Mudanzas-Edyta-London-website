// Pricing constants - easy to edit for business updates
export const VAN_BASE_HOURLY = {
  small: 40,
  medium: 45,
  large: 50, // Luton van
} as const;

export const LOADER_HOURLY = 25;
export const MIN_HOURS = 2;
export const MILE_RATE = 1.5;
export const FREE_MILES_THRESHOLD = 10;

export type VanSize = keyof typeof VAN_BASE_HOURLY;

export interface QuoteInputs {
  vanSize: VanSize;
  loaders: number;
  hours: number;
  miles: number;
}

export interface QuoteBreakdown {
  vanBaseHourly: number;
  loadersHourly: number;
  baseHourly: number;
  requestedHours: number;
  billableHours: number;
  miles: number;
  distanceCharge: number;
  total: number;
}

/**
 * Calculate the total quote based on business rules:
 * - 2-hour minimum enforced
 * - First 10 miles free, then £1.50 per mile for ALL miles if > 10
 * - Base hourly = van rate + (loaders × loader rate)
 */
export function calculateQuote(inputs: QuoteInputs): QuoteBreakdown {
  const { vanSize, loaders, hours, miles } = inputs;
  
  const vanBaseHourly = VAN_BASE_HOURLY[vanSize];
  const loadersHourly = loaders * LOADER_HOURLY;
  const baseHourly = vanBaseHourly + loadersHourly;
  
  const billableHours = Math.max(MIN_HOURS, hours);
  
  // Mileage rule: if miles ≤ 10 → £0, if miles > 10 → charge for ALL miles
  const distanceCharge = miles <= FREE_MILES_THRESHOLD ? 0 : miles * MILE_RATE;
  
  const total = baseHourly * billableHours + distanceCharge;
  
  return {
    vanBaseHourly,
    loadersHourly,
    baseHourly,
    requestedHours: hours,
    billableHours,
    miles,
    distanceCharge,
    total,
  };
}

/**
 * Format currency in GBP
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get van size display name
 */
export function getVanSizeDisplay(vanSize: VanSize): string {
  const displayNames = {
    small: 'Small Van',
    medium: 'Medium Van',
    large: 'Luton Van (17.3m³)',
  };
  return displayNames[vanSize];
}

/**
 * Get minimum quote for display (Small van + driver, 2 hours)
 */
export function getMinimumQuote(): string {
  const minQuote = calculateQuote({
    vanSize: 'small',
    loaders: 0,
    hours: MIN_HOURS,
    miles: 0,
  });
  return formatCurrency(minQuote.total);
}



