export interface Color {
  r: number;
  g: number;
  b: number;
}

export function predictTextColor(color: Color): number {
  const value = (-0.002658900692 * color.r + 0.9726844531 + -0.004339532172 * color.g + 1.050614409 + -0.002601957336 * color.b + 0.9287718383) / 3;
  if (value > 0.46) {
    return {
      r: 255,
      g: 255,
      b: 255
    };
  } else {
    return {
      r: 0,
      g: 0,
      b: 0
    };
  }
}
