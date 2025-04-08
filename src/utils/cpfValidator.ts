
/**
 * Validates a CPF (Brazilian individual taxpayer registry) number
 * @param cpf CPF number to validate (can include dots and hyphen)
 * @returns boolean indicating if the CPF is valid
 */
export function validateCPF(cpf: string): boolean {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');

  // Check if it has 11 digits
  if (cpf.length !== 11) {
    return false;
  }

  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calculate first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  const firstDigit = remainder >= 10 ? 0 : remainder;

  // Calculate second verification digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  const secondDigit = remainder >= 10 ? 0 : remainder;

  // Check if verification digits match
  return (
    parseInt(cpf.charAt(9)) === firstDigit &&
    parseInt(cpf.charAt(10)) === secondDigit
  );
}

/**
 * Formats a CPF string with the standard format (000.000.000-00)
 * @param cpf CPF string to format
 * @returns formatted CPF string
 */
export function formatCPF(cpf: string): string {
  // Remove non-numeric characters
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Limit to 11 digits
  cpf = cpf.slice(0, 11);
  
  // Apply formatting
  if (cpf.length <= 3) {
    return cpf;
  } else if (cpf.length <= 6) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  } else if (cpf.length <= 9) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  } else {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
  }
}
