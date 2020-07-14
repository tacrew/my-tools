import * as colorString from "color-string";

export const getRgba = (colorCode: string): colorString.Color | undefined => {
    const color = colorString.get(colorCode);
    if (!color) {
        return;
    }
    switch (color.model) {
        case "rgb":
            return color.value;
        case "hsl":
            return hslToRgb(color.value);
        default:
            return;
    }
};

const hslToRgb = (hsla: colorString.Color): colorString.Color => {
    const [hh, ss, ll, a] = hsla;
    const [h, s, l] = [hh / 360, ss / 100, ll / 100];
    if (s === 0) {
        return [Math.round(l * 255), Math.round(l * 255), Math.round(l * 255), a];
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
};

export const rgbToHsl = (rgba: colorString.Color) => {
    const [rr, gg, bb, a] = rgba;
    const [r, g, b] = [rr / 255, gg / 255, bb / 255];

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100), a];
};
