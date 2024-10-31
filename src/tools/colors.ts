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

export function ColorToString(color: Color): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
}

interface ColorPack {
  background: string;
  text: string;
}

export function getColorPack(color: Color): ColorPack {
  const result: ColorPack = {
    background: ColorToString(color),
    text: ColorToString(predictTextColor(color))
  };
  return result;
}
