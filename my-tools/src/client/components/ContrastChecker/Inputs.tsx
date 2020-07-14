import * as React from "react";
import styled from "styled-components";

type Props = {
    background: string,
    setBackground: React.Dispatch<React.SetStateAction<string>>,
    foreground: string,
    setForeground: React.Dispatch<React.SetStateAction<string>>,
}

const Inputs: React.FC<Props> = (props) => {
    const handleBackground = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = String(event.target.value);
        props.setBackground(value);
    };

    const handleForeground = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = String(event.target.value);
        props.setForeground(value);
    };

    return (
        <InputsWrapper>
            <label className="background">
                <span>背景色</span>
                <input
                    id="background"
                    type="text"
                    value={props.background}
                    onChange={handleBackground}
                    autoFocus
                />
            </label>
            <label className="foreground">
                <span>文字色</span>
                <input
                    id="foreground"
                    type="text"
                    value={props.foreground}
                    onChange={handleForeground}
                    autoFocus
                />
            </label>
        </InputsWrapper>
    );
};

const InputsWrapper = styled.section`
  label {
    position: absolute;
  }

  span {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.2em 0.5em;
    border-radius: 0.3em;
  }

  .background {
    margin-left: calc(50% - 30% - 4.2em);
    text-align: left;
    span {
      margin-left: 1em;
    }
  }

  .foreground {
    left: 50%;
    text-align: right;
    span {
      margin-right: 1em;
    }
  }

  input {
    display: block;
    margin-top: -0.1em;
    padding: 0.2em 0;
    width: 30vw;
    font-size: 2rem;
    border: thin solid rgba(0, 0, 0, 0.3);
    background: hsla(0, 0%, 90%, 0.9);
    color: #333;
    box-shadow: 0.05em 0.1em 0.1em rgba(0, 0, 0, 0.4) inset;
  }
  input#background {
    padding-right: 2em;
    border-radius: 0.3em 0 0 0.3em;
    text-align: right;
  }

  input#foreground {
    padding-left: 2em;
    border-radius: 0 0.3em 0.3em 0;
  }
`;

export default Inputs;
