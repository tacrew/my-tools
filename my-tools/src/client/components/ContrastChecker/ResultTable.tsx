import * as React from "react";
import styled from "styled-components";

type Props = {
    contrastRatio: number | undefined
}

const ResultTable: React.FC<Props> = (props) => {
    const contrastRatio = props.contrastRatio ? props.contrastRatio : 0;
    return (
        <TableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>
                            WCAG
                            <br />
              Standard
                        </th>
                        <th>
                            標準
                            <br />
                        </th>
                        <th>
                            見出し(24px以上)
                            <br />
              太字(18.5px以上)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>AA</td>
                        <td>{contrastRatio > 4.5 ? "Pass" : "Fail"}</td>
                        <td>{contrastRatio > 3.0 ? "Pass" : "Fail"}</td>
                    </tr>
                    <tr>
                        <td>AAA</td>
                        <td>{contrastRatio > 7.0 ? "Pass" : "Fail"}</td>
                        <td>{contrastRatio > 4.5 ? "Pass" : "Fail"}</td>
                    </tr>
                </tbody>
            </table>
        </TableWrapper>
    );
};

const TableWrapper = styled.section`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    table-layout: fixed;
    font-size: 1.1rem;
    text-align: center;
    th,
    td {
      border-bottom: 1px solid #ddd;
    }
  }
`;

export default ResultTable;
