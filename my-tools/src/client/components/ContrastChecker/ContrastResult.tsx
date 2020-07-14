import * as React from "react";
import styled from "styled-components";

type Props = {
    contrast: {
        ratio: number | undefined,
        error: number | undefined
    }
}

const ContrastResult: React.FC<Props> = (props) => {
    const ratio = props.contrast.ratio ? Math.round(props.contrast.ratio * 100) / 100 : "?";
    const error = props.contrast.error ? Math.round(props.contrast.error * 100) / 100 : false;

    let backgroundColor;
    if (ratio < 3) {
        backgroundColor = "hsl(0, 100%, 40%)";
    } else if (ratio < 4.5) {
        backgroundColor = "hsl(40, 100%, 45%)";
    } else if (ratio < 7) {
        backgroundColor = "hsl(80, 60%, 45%)";
    } else {
        backgroundColor = "hsl(95, 60%, 41%)";
    }

    const iconStyle = {
        background: `${backgroundColor} -35% -35%`,
    };

    return (
        <Contrast style={iconStyle}>
            <strong>{ratio}</strong>
            <div className="error">{error ? `±${error}` : ""}</div>
        </Contrast>
    );
};

const Contrast = styled.div`
  display: block;
  position: relative;
  width: 3.4em;
  padding: 1em 0;
  margin: 0 auto;
  top: 0.1em;
  border: thin solid rgba(0, 0, 0, 0.4);
  background: hsl(0, 0%, 50%) -35% -35%;
  background-size: 142% 142%;
  text-align: center;
  color: white;
  text-shadow: 0 -0.06em 0.05em rgba(0, 0, 0, 0.5);
  font-size: 1.8em;
  letter-spacing: -0.05em;
  box-shadow: 0.05em 0.1em 0.2em rgba(0, 0, 0, 0.4),
    -0.1em -0.1em 0.5em rgba(0, 0, 0, 0.4) inset,
    0 0.3em hsla(0, 0%, 100%, 0.2) inset;
  border-radius: 50%;
  strong {
    color: white !important;
  }
  .error {
    position: absolute;
    left: 1.5em;
    bottom: 0.4em;
    font-size: 0.55em;
    font-weight: 700;
  }
`;

export default ContrastResult;
