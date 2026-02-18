export function containsHarmfulContent(text: string): boolean {
  const bannedWords = [
    "kill",
    "hate",
    "violence",
    "abuse",
    "suicide",
    "harm",
    "attack",
    "murder"
  ];

  const lower = text.toLowerCase();

  return bannedWords.some(word => lower.includes(word));
}
