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
}