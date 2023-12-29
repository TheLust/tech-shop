export function formatCamelCaseToWords(input: string): string {
  return input.split(/(?=[A-Z])/)
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word.toLowerCase();
      }
    }).join(' ');
}
