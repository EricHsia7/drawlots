export interface ColorInRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorInHSV {
  h: number;
  s: number;
  v: number;
}

export function RGBToHSV(color: ColorInRGB): ColorInHSV {
  function roundPercent(number: number) {
    return Math.round(number * 100) / 100;
  }

  // Normalize RGB values to [0, 1]
  const rNorm = color.r / 255;
  const gNorm = color.g / 255;
  const bNorm = color.b / 255;

  // Get the maximum and minimum values from normalized RGB
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;

  // Initialize HSV components
  let h = 0;
  let s = 0;
  let v = max;

  // Saturation calculation
  if (max !== 0) s = diff / max;

  // Hue calculation based on RGB color
  if (diff !== 0) {
    const diffComponent = (color) => (max - color) / 6 / diff + 1 / 2;

    const rDiff = diffComponent(rNorm);
    const gDiff = diffComponent(gNorm);
    const bDiff = diffComponent(bNorm);

    if (rNorm === max) {
      h = bDiff - gDiff;
    } else {
      if (gNorm === max) {
        h = 1 / 3 + rDiff - bDiff;
      } else {
        if (bNorm === max) {
          h = 2 / 3 + gDiff - rDiff;
        }
      }
    }

    // Adjust hue to be in [0, 1] range
    if (h < 0) {
      h += 1;
    } else {
      if (h > 1) {
        h -= 1;
      }
    }
  }

  // Convert h to degrees, s and v to percentages
  return {
    h: Math.round(h * 360),
    s: roundPercent(s * 100),
    v: roundPercent(v * 100)
  };
}

export function HSVToRGB(color: ColorInHSV): ColorInRGB {
  var r, g, b;
  var i;
  var f, p, q, t;

  // Make sure our arguments stay in-range
  let h = Math.max(0, Math.min(360, color.h));
  let s = Math.max(0, Math.min(100, color.s));
  let v = Math.max(0, Math.min(100, color.v));

  // Standrize the input.
  s /= 100;
  v /= 100;

  if (s == 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default: // case 5:
      r = v;
      g = p;
      b = q;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function predictTextColor(color: ColorInRGB): number {
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

export function ColorToString(color: ColorInRGB): string {
  return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
}

interface ColorPack {
  background: string;
  text: string;
}

export function getColorPack(color: ColorInRGB): ColorPack {
  const result: ColorPack = {
    background: ColorToString(color),
    text: ColorToString(predictTextColor(color))
  };
  return result;
}

export function getColorVariations(originalColor: ColorInRGB, distance: number = 35, quantity: number = 3): Array<ColorInRGB> {
  function generateSimilarColor(originalColor: ColorInRGB, distance: number) {
    const originalColorInHSV = RGBToHSV(originalColor.r, originalColor.g, originalColor.b);

    let hue = 0;
    let saturation = 0;
    let brightness = 0; // brightness = value

    // Adjusting hue range based on hue position
    if (originalColorInHSV.h < distance) {
      hue = originalColorInHSV.h + Math.floor(Math.random() * distance);
    }
    if (originalColorInHSV.h > distance && originalColorInHSV.h < 360 - distance) {
      hue = originalColorInHSV.h + Math.floor(-distance + Math.random() * (distance * 2));
    }
    if (originalColorInHSV.h > 360 - distance) {
      hue = originalColorInHSV.h - Math.floor(Math.random() * distance);
    }

    // Adjusting saturation range based on saturation level
    if (originalColorInHSV.s < distance) {
      saturation = originalColorInHSV.s + Math.floor(Math.random() * distance);
    }
    if (originalColorInHSV.s > distance && originalColorInHSV.s < 100 - distance) {
      saturation = originalColorInHSV.s + Math.floor(-distance + Math.random() * (distance * 2));
    }
    if (originalColorInHSV.s > 100 - distance) {
      saturation = originalColorInHSV.s - Math.floor(Math.random() * distance);
    }

    // Adjusting brightness range based on brightness level
    if (originalColorInHSV.v < distance) {
      brightness = originalColorInHSV.v + Math.floor(Math.random() * distance);
    }
    if (originalColorInHSV.v > distance && originalColorInHSV.v < 100 - distance) {
      brightness = originalColorInHSV.v + Math.floor(-distance + Math.random() * (distance * 2));
    }
    if (originalColorInHSV.v > 100 - distance) {
      brightness = originalColorInHSV.v - Math.floor(Math.random() * distance);
    }

    return HSVToRGB(hue, saturation, brightness);
  }

  let result = [];
  for (let i = 0; i < quantity; i++) {
    let color = { r: 0, g: 0, b: 0 };
    const randomIndex = Math.floor((result.length - 1) * Math.random());
    if (randomIndex > 0) {
      color = generateSimilarColor(result[randomIndex], distance);
    } else {
      color = generateSimilarColor(originalColor, distance);
    }
    result.push(color);
  }
  return result;
}
