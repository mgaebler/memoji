import styled from "styled-components";

export type ICardGrid = {
  items: number;
};

export const CardGrid = styled.div<ICardGrid>(({ items }) => ({
  display: "grid",
  height: "80vh",
  width: "80vh",
  // alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  // columnGap: "1vh",
  // rowGap: "1vh",
  // make sure the cards fit in every orientation
  "@media screen and (orientation:landscape)": {
    gridTemplateColumns: `${100 / items}vh `.repeat(items),
    gridTemplateRows: `${100 / items}vh `.repeat(items),
  },
  "@media screen and (orientation:portrait)": {
    gridTemplateColumns: `${100 / items}vw `.repeat(items),
    gridTemplateRows: `${100 / items}vw `.repeat(items),
  },
}));

export const GridTile = styled.div({
  // outline: "thin dashed red",
  // padding: "1vh",
  // perspective: "600px",
});
