
/**
 * Formats a CEP (Brazilian postal code) string to the standard format (00000-000)
 */
export const formatCEP = (cep: string): string => {
  // Remove any non-digit characters
  const digits = cep.replace(/\D/g, '');
  
  // Format as 00000-000
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};

/**
 * Checks if the input text matches a CEP pattern (even partially)
 */
export const isCEPPattern = (text: string): boolean => {
  // Check if the input matches a CEP pattern (even partially)
  return /^\d{5}-?\d{0,3}$/.test(text);
};
