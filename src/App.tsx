import React, { useState } from "react";
import styled from "styled-components";
import { RGBColor, SketchPicker } from "react-color";
import tw from "tailwind-styled-components";
import TextareaAutosize from "react-textarea-autosize";
import * as d3 from "d3";
import { getAlphabetMap } from "./alphabet";

interface xy {
  x: number;
  y: number;
}

const keysMap = getAlphabetMap();

const Wrapper = tw.div`
  flex
`;

const Textarea = tw(TextareaAutosize)`
  w-full
  border-2
  p-1
`;

const SVGWrapper = tw.div`
  flex-1
  p-1
  border-2
  mr-2
`;

const ToolsWrapper = tw.div`
  border-2
  p-2
  h-full
`;

const SVG = tw.svg`
  overflow-visible
  block
  m-12
  w-1
  h-1
`;

function rgbToString(rgb: RGBColor) {
  const { r, g, b, a } = rgb;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function App() {
  const [value, setValue] = useState("");
  const [color, setColor] = useState("#000000");

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
          <path stroke={color} fill="none" stroke-width="3" d={d || ""} />
        </SVG>
      );
    });

    return paths;
  };

  return (
    <>
      <Textarea
        placeholder="Писать тут"
        minRows={3}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Wrapper>
        <SVGWrapper>{renderGlyphs()}</SVGWrapper>
        <ToolsWrapper>
          <SketchPicker
            color={color}
            onChange={(color) => setColor(rgbToString(color.rgb))}
          ></SketchPicker>
        </ToolsWrapper>
      </Wrapper>
    </>
  );
}

export default App;
