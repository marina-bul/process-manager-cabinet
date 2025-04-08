export function validatePhone (phone: string): boolean {
  const digits = phone.replace(/\D/g, '');

  return /^\d{11}$/.test(digits);
};

export function validateEmail (email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function formatPhone(phone?: string): string {

  if(!phone) throw new Error('Please, type a phone number');
  if(!validatePhone(phone)) throw new Error('Phone number should contains 11 digits');

  const digits = phone.replace(/\D/g, '');

  const countryCode = digits[0];
  const areaCode = digits.slice(1, 4);
  const prefix = digits.slice(4, 7);
  const lineNumber = digits.slice(7);

  return `+${countryCode} ${areaCode} ${prefix} ${lineNumber}`;
};

export const dateFormatter = {
  toDisplay: (dateStr?: string) => {
    if(!dateStr) return;

    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  },

  toISO: (dateStr: string) => {
    const [day, month, year] = dateStr.split('.');
    return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
  },
}