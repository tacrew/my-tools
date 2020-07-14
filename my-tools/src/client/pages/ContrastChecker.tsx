import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

import Header from "../components/ContrastChecker/Header";
import Inputs from "../components/ContrastChecker/Inputs";
import ContrastResult from "../components/ContrastChecker/ContrastResult";
import ColorCodes from "../components/ContrastChecker/ColorCodes";
import ResultTable from "../components/ContrastChecker/ResultTable";
import Footer from "../components/ContrastChecker/Footer";

import { getRgba } from "../utils/colorConverter";
import { getContrast, getTextColor } from "../utils/colorContrast";

const ContrastChecker: React.FC = () => {
    const [background, setBackground] = useState("white");
    const [foreground, setForeground] = useState("hsla(200,0%,0%,.7)");

    const bgRgb = getRgba(background);
    const fgRgb = getRgba(foreground);
    const contrast = bgRgb && fgRgb ? getContrast(bgRgb, fgRgb) : { ratio: undefined, error: undefined };
    const textcolor = fgRgb ? getTextColor(fgRgb) : "black";

    const mainStyle = {
        backgroundImage: `linear-gradient(90deg, ${background} 50%, ${foreground} 50%)`,
    };

    const sampleStyle = {
        color: foreground,
    };

    const textStyle = {
        color: textcolor,
    };

    return (
        <Layout style={mainStyle}>
            <Header />
            <main>
                <Inputs
                    background={background}
                    setBackground={setBackground}
                    foreground={foreground}
                    setForeground={setForeground}
                />
                <ContrastResult contrast={contrast} />
                <ColorCodes bgRgb={bgRgb!} fgRgb={fgRgb!} />

                <TextContainer>
                    <div style={sampleStyle}>
                        <h2>コントラスト検証用サンプル文章(24px)</h2>
                        <p>
                            この文章は入力した色の組み合わせでの読みやすさを確認するための文章です。
                            本文の文字サイズを16pxに、見出し部分を24pxに設定してあります。
                        </p>
                        <p>
                            <strong>
                                18.5pxサイズの太字の場合のサンプル文章はこちらです。
                            </strong>
                        </p>
                    </div>

                    <div style={textStyle}>
                        <h2>コントラストチェッカーの使い方</h2>
                        <p>
                            背景色と文字色をそれぞれのフォームに入力すると、コントラスト比率が計算されます。
                            カラーコードはRGB, HEX, HSL表記に対応しています。
                        </p>
                        <p>
                            左側の検証用のサンプル文章にて、入力した色の組み合わせにおける
                            見出し文字や本文、太字の見え方を確認できます。
                        </p>
                    </div>

                    <div style={sampleStyle}>
                        <h2>Web Content Accessibility Guidelines (WCAG) 2.1</h2>
                        <p>
                            <a href="https://waic.jp/docs/WCAG21/#contrast-minimum">
                                Web Content Accessibility Guidelines (WCAG)
                            </a>
              2.1とは、ウェブコンテンツをよりアクセシブルにするためのガイドラインを指します。
              当該ガイドラインに従うことにより障害のある人を含めたすべての利用者にとって使いやすいウェブサイトになります。
              達成レベルにはAA（達成）とAAA（高いレベルで達成）の2種類があります。
                        </p>
                        <ul>
                            <li>コントラスト比 0.0 ~ 3.0: すべての文字サイズで不適合</li>
                            <li>コントラスト比 3.0 ~ 4.5: 見出しまたは太字のみAA</li>
                            <li>
                                コントラスト比 4.5 ~ 7.0:
                                すべての文字サイズでAA、見出しまたは太字のみAAA
                            </li>
                            <li>コントラスト比 7.0 ~ : すべての文字サイズでAAA</li>
                        </ul>
                    </div>

                    <div style={textStyle}>
                        <h2>WCAG適合可否の早見表</h2>
                        <ResultTable contrastRatio={contrast.ratio} />
                    </div>
                </TextContainer>
                <Footer />
            </main>
        </Layout>
    );
};

const Layout = styled.div`
  :root {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: auto;
    font-family: 'segoe ui', meiryo, 'yu gothic', 'hiragino kaku gothic pron',
      sans-serif;
  }

  a {
    text-decoration: none;
    transition: 0.2s;
    :focus {
      outline: none;
    }
  }
`;

const TextContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  div {
    width: calc(50% - 10%);
    padding: 0 5%;
  }
  h2 {
    font-size: 24px;
  }
  strong {
    font-size: 18.5px;
  }
`;

export default ContrastChecker;
