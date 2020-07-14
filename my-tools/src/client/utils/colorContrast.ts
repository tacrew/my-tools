import * as colorString from "color-string";

const getLuminance = (rgba: colorString.Color) => {
    const temp = rgba.slice(0, 3).map((rgb) => {
        const i = rgb / 255;
        return i < 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * temp[0] + 0.7152 * temp[1] + 0.0722 * temp[2];
};

const overlay = (bgRgba: colorString.Color, fgRgba: colorString.Color): colorString.Color =>  {
    const alpha = fgRgba[3];
    if (alpha >= 1) {
        return fgRgba;
    }
    const overlaid: any = fgRgba.map((_, i) => {
        if (i === 3) {
            return alpha + bgRgba[3] * (1 - alpha);
        } else {
            return fgRgba[i] * alpha + bgRgba[i] * bgRgba[3] * (1 - alpha);
        }
    });
    return overlaid;
};

export const getTextColor = (rgba: colorString.Color) => {
    if (rgba[3] < 1) {
        const lumBlack = getLuminance(overlay([0, 0, 0, 1], rgba));
        const lumWhite = getLuminance(overlay([255, 255, 255, 1], rgba));
        return Math.min(lumBlack, lumWhite) < 0.2 ? "white" : "black";
    } else {
        return getLuminance(rgba) < 0.2 ? "white" : "black";
    }
};

export const getContrast = (bgRgba: colorString.Color, fgRgba: colorString.Color) => {
    if (bgRgba[3] >= 1) {
        const l2 =
            fgRgba[3] < 1
                ? getLuminance(overlay(bgRgba, fgRgba)) + 0.05
                : getLuminance(fgRgba) + 0.05;
        const l1 = getLuminance(bgRgba) + 0.05;

        return {
            ratio: l1 > l2 ? l1 / l2 : l2 / l1,
            error: 0,
        };
    }

    const onBlack = overlay([0, 0, 0, 1], bgRgba);
    const onWhite = overlay([255, 255, 255, 1], bgRgba);
    const contrastOnBlack = getContrast(onBlack, fgRgba).ratio;
    const contrastOnWhite = getContrast(onWhite, fgRgba).ratio;

    const max = Math.max(contrastOnBlack, contrastOnWhite);
    let min = 1;
    if (getLuminance(onBlack) > getLuminance(fgRgba)) {
        min = contrastOnBlack;
    } else if (getLuminance(onWhite) < getLuminance(fgRgba)) {
        min = contrastOnWhite;
    }

    return {
        ratio: (min + max) / 2,
        error: (max - min) / 2,
    };
};
