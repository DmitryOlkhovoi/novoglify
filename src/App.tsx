import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import TextareaAutosize from "react-textarea-autosize";
import * as d3 from "d3";
import { getAlphabetMap } from "./alphabet";

interface xy {
  x: number;
  y: number;
}

const keysMap = getAlphabetMap();

let Wrapper: any = styled.div`
  textarea {
    flex: 1;
    height: 100px;
  }

  div {
    flex: 1;
  }
`;

Wrapper = tw(Wrapper)`
  flex
`;

const SVG = tw.svg`
  overflow-visible
  block
  m-12
  w-1
  h-1
`;

function App() {
  const [value, setValue] = useState("");

  const renderGlyphs = () => {
    const paths: JSX.Element[] = [];

    value.split(" ").forEach((word) => {
      const points: xy[] = [];

      word.split("").forEach((v) => {
        const vl = v.toLowerCase();

        if (keysMap.has(vl)) {
          const [x, y] = keysMap.get(vl)!;
          points.push({ x: x, y: y });
        }
      });

      const d = d3
        .line<xy>()
        .x((p) => p.x * 20)
        .y((p) => p.y * 20)
        .curve(d3.curveNatural)(points);

      paths.push(
        <SVG>
          <path
            stroke="rgb(52 52 52 / 50%)"
            fill="none"
            stroke-width="3"
            d={d || ""}
          />
        </SVG>
      );
    });

    return paths;
  };

  return (
    <Wrapper>
      <TextareaAutosize
        minRows={10}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <div>{renderGlyphs()}</div>
    </Wrapper>
  );
}

export default App;
