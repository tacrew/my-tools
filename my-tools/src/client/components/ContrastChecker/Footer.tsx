import * as React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
    return (
        <FooterContent>
            <h2>運営者情報</h2>
            <p>
                このツールは tacrew により運営されています。<br />
                ソースコードは<a href="https://github.com/tacrew/my-tools/tree/master/my-tools">こちら</a>より確認できます。
            </p>
        </FooterContent>
    );
};

const FooterContent = styled.footer`
  width: calc(50% - 10%);
  padding: 0 5%;
`;

export default Footer;
