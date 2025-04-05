export function getInitials(input: string): string {
  const words = input.trim().split(/\s+/);

  if (words.length === 0) {
    return "";
  } else if (words.length === 1) {
    return words[0]?.charAt(0).toUpperCase() || "";
  } else {
    const firstLetter = words[0]?.charAt(0).toUpperCase() || "";
    const secondLetter = words[1]?.charAt(0).toUpperCase() || "";
    return firstLetter + secondLetter;
  }
}
