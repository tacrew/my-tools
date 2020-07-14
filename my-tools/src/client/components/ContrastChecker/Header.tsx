import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import * as routes from "../../constants/routes";

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <h1>
                <Link to={routes.CONTRAST_CHECK}>
                    <div>
                        <span>コントラスト</span>
                    </div>
                    <div>
                        <span>チェッカー</span>
                    </div>
                </Link>
            </h1>
        </HeaderWrapper>
    );
};

const HeaderWrapper = styled.header`
  padding: 2.5em 0;
  width: 100%;

  h1 {
    margin: 0;
    letter-spacing: -1px;
    a {
      display: flex;
    }
    div {
      flex: 1 1 0;
      font-size: 1.8rem;
    }
    div:first-child {
      text-align: right;
      span {
        padding: 0.2em 0.2em;
        background: black;
        color: white;
      }
    }
    div:last-child {
      text-align: left;
      span {
        padding: 0.2em 0.2em;
        background: white;
        color: black;
      }
    }
  }
`;

export default Header;
