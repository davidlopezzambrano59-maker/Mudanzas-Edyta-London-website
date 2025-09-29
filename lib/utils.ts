import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  // Format UK phone numbers nicely
  const digits = phone.replace(/\D/g, '');
  
  if (digits.startsWith('44')) {
    const number = digits.slice(2);
    if (number.length === 10) {
      return `+44 ${number.slice(0, 4)} ${number.slice(4, 7)} ${number.slice(7)}`;
    }
  }
  
  if (digits.startsWith('0') && digits.length === 11) {
    return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  
  return phone;
}



