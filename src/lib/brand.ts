// Prismatic glass palette pulled from the real Execution Labs brand asset.
// Warm + violet + teal, no blue as the main color.
export const brandGradients = [
  "linear-gradient(135deg,#e83ede,#9333ea)",
  "linear-gradient(135deg,#14c8aa,#0f766e)",
  "linear-gradient(135deg,#fb8c28,#fb566e)",
  "linear-gradient(135deg,#9333ea,#14c8aa)",
  "linear-gradient(135deg,#fb566e,#fb8c28)",
  "linear-gradient(135deg,#2dd4bf,#9333ea)",
];

export function gradient(i: number) {
  return brandGradients[i % brandGradients.length];
}

export const brandColors = [
  "#e83ede",
  "#14c8aa",
  "#fb8c28",
  "#9333ea",
  "#fb566e",
  "#2dd4bf",
];

export function accent(i: number) {
  return brandColors[i % brandColors.length];
}
