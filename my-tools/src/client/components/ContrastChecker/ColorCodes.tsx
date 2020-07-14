import * as React from "react";
import styled from "styled-components";
import * as colorString from "color-string";

import { getTextColor } from "../../utils/colorContrast";
import { rgbToHsl } from "../../utils/colorConverter";

type RGB = {
    rgb: colorString.Color
}

const ColorCode: React.FC<RGB> = (props) => {
    const rgb = props.rgb;
    const hex = rgb ? colorString.to.hex(rgb) : "";
    const rgba = rgb ? colorString.to.rgb(rgb) : "";
    const hsla = rgb ? colorString.to.hsl(rgbToHsl(rgb)) : "";
    const color = rgb ? getTextColor(rgb) : "black";

    return (
        <ul style={{ color: color }}>
            <li>HEX: {hex}</li>
            <li>RGB: {rgba}</li>
            <li>HSL: {hsla}</li>
        </ul>
    );
};

type Props = {
    bgRgb: colorString.Color,
    fgRgb: colorString.Color
}

const ColorCodes: React.FC<Props> = (props) => {
    return (
        <ColorCodeContainer>
            <ColorCode rgb={props.bgRgb} />
            <ColorCode rgb={props.fgRgb} />
        </ColorCodeContainer>
    );
};

const ColorCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  ul {
    flex: 1;
    padding-left: 17vw;
    margin-top: -0.5em;
    list-style: none;
    text-align: left;
    font-size: 1.1em;
  }
`;

export default ColorCodes;
